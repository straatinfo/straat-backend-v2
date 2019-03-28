const CategoryHelper = require('../../helpers/category.helper');
const lib = require('../../lib');

function validateParams (req, res, next) {
  var schema = {
    code: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Code'
      }
    },
    name: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Code'
      }
    },
    description: {
      optional: true
    },
    nl: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Dutch Translation'
      }
    }
  };

  req.checkBody(schema);
  const validationErrors = req.validationErrors();

  if (validationErrors) {
    const errorObject = lib.errorResponses.validationError(validationErrors);
    // req.logger.warn(errorObject, 'POST /api/hosts');
    return res.status(errorObject.httpCode).send(errorObject);
  } else {
    return next();
  }
}

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

function getFreeHost (req, res, next) {
  return req.db.User.findOne({ hostName: 'freeHost' }, [
    '_id', 'hostName', 'houseNumber', 'streetName', 'state',
    'city', 'state', 'country', 'postalCode', 'username',
    'phoneNumber', 'long', 'lat', 'isPatron', 'email',
    'lname', 'fname', 'hostPersonalEmail', 'isSpecific',
    'isActivated'
  ])
  .populate('_role')
    .populate({
      path: 'mainCategories',
      populate: {
        path: 'subCategories'
      }
    })
    .populate('_activeDesign')
    .populate('design')
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
      console.log('Free host loaded');
      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function checkReportType (req, res, next) {
  const code = req.body.code;
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

function addMainCategory (req, res, next) {
  const { name, code, nl, description } = req.body
  const host = req.$scope.host;
  const reportType = req.$scope.reportType;
  const newMainCategory = new req.db.MainCategory({
    name: name,
    code: code,
    description: description,
    translations: [
      { code: 'en', word: name },
      { code: 'nl', word: nl }
    ],
    _host: host._id,
    _reportType: reportType._id
  });


  return newMainCategory.save()
    .then((mainCategory) => {
      if (!mainCategory) {
        return res.status(400).send({
          status: 'ERROR',
          statusCode: 101,
          httpCode: 400,
          message: 'Cannot add Main Category right now'
        });
      }

      req.$scope.mainCategory = mainCategory;

      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function updateReportType (req, res, next) {
  const reportType = req.$scope.reportType;
  const mainCategory = req.$scope.mainCategory;
  return req.db.ReportType.findByIdAndUpdate(reportType._id,
    { '$addToSet': { 'mainCategories': mainCategory._id } },
    { 'new': true, 'upsert': true })
    .then((updatedReportType) => {
      req.$scope.reportType = updatedReportType;

      return next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function updateHost (req, res, next) {
  const mainCategory = req.$scope.mainCategory;
  const host = req.$scope.host;
  return req.db.User.findByIdAndUpdate(host._id,
    { '$addToSet': { 'mainCategories': mainCategory._id } },
    { 'new': true, 'upsert': true })
    .then((updatedHost) => {
      next();

      return (undefined);
    })
    .catch((err) => internals.catchError(err, req, res));
}

function response (req, res, next) {
  const mainCategory = req.$scope.mainCategory;

  return req.db.MainCategory.findById(mainCategory._id)
    .populate('_host', [
      '_id', 'hostName', 'email', 'houseNumber',
      'streetName', 'city', 'state', 'country',
      'postalCode', 'long', 'lat', '_role',
      'lname', 'fname', 'hostPersonalEmail'
    ])
    .populate('subCategories')
    .populate('_reportType')
    .then((mainCat) => {
      return internals.flatMainCategory({...mainCat.toObject()})
    })
    .then((mainCat) => {
      console.log('Success: ', mainCat, ': Successfully sent request');
      res.status(200).send({
        status: 'SUCCESS',
        statusCode: 0,
        httpCode: 200,
        data: mainCat 
      })

      return (undefined);
    })
    .catch((err) => internals.catchError(err, req, res));
}

module.exports = {
  validateParams,
  checkHost,
  getFreeHost,
  checkReportType,
  addMainCategory,
  updateReportType,
  updateHost,
  response
};
