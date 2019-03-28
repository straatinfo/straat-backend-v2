
const CategoryHelper = require('../../helpers/category.helper');
const Promise = require('bluebird');

const internals = {};

internals.catchError = function (err, req, res) {
  console.log(err);
  return res.status(500).send({
    status: 'ERROR',
    statusCode: 100,
    httpCode: 500,
    message: 'Internal Server Error'
  });
};

internals.flatMainCategory = function (m) {
  const flatMC = {
    _id: m._id || null,
    name: m.name || null,
    createdAt: m.createdAt || null,
    updatedAt: m.updatedAt || null,
    '_host._id': (m._host && m._host._id) ? m._host._id : null,
    '_host.hostName': (m._host && m._host.hostName) ? m._host.hostName : null,
    '_reportType._id': (m._reportType && m._reportType._id) ? m._reportType._id : null,
    '_reportType.code': (m._reportType && m._reportType.code) ? m._reportType.code : null,
    '_reportType.name': (m._reportType && m._reportType.name) ? m._reportType.name : null,
    subCategories: m.subCategories || [],
    translations: m.translations || []
  };

  return flatMC;
}

function checkHost (req, res, next) {
  const _host = req.params.hostId;
  if (!_host) {
    return res.status(400).send({
      status: 'ERROR',
      statusCode: 102,
      httpCode: 400,
      message: 'Invalid Parameter: Host ID'
    });
  }

  return req.db.User.findById(_host)
    .then((host) => {
      if (!host) {
        return res.status(400).send({
          status: 'ERROR',
          statusCode: 102,
          httpCode: 400,
          message: 'Invalid Parameter: Host ID'
        });
      }

      req.$scope.host = host;
      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function checkReportType (req, res, next) {
  const code = req.query.code || 'A'
  return req.db.ReportType.findOne({ code })
    .then((reportType) => {
      if (!reportType) {
        return res.status(400).send({
          status: 'ERROR',
          statusCode: 101,
          httpCode: 400,
          message: 'Invalid Parameter: Code',
          err: 'Invalid Report Type Code'
        });
      }

      req.$scope.reportType = reportType;

      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function getMainCategories (req, res, next) {
  const reportType = req.$scope.reportType;
  const _host = req.params.hostId;

  return req.db.MainCategory.findOne({ _reportType: reportType._id, _host: _host })
    .populate('_host', [
      '_id', 'hostName', 'email', 'houseNumber',
      'streetName', 'city', 'state', 'country',
      'postalCode', 'long', 'lat', '_role',
      'lname', 'fname', 'hostPersonalEmail'
    ])
    .populate('subCategories')
    .populate('_reportType')
    .then((mainCategories) => {
      if (req.query.flat == 'true') {
        req.$scope.mainCategories = mainCategories;
        return next();
      }

      res.status(200).send({
        status: 'SUCCESS',
        statusCode: 0,
        httpCode: 200,
        data: mainCategories || []
      });

      return (undefined);
    })
    .catch((err) => internals.catchError(err, req, res));
}

function flatMainCategories (req, res, next) {
  const mainCategories = req.$scope.mainCategories || [];
  
  const flatMC = mainCategories.map(internals.flatMainCategory);

  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    data: flatMC
  });

  return (undefined);
}

module.exports = {
  checkHost,
  checkReportType,
  getMainCategories,
  flatMainCategories
};
