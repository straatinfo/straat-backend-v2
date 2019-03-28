const internals = {};


internals.catchError = function (err, req, res) {
  console.log(err);
  res.status(500).send({
    status: 'ERROR',
    statusCode: 100,
    httpCode: 500,
    message: 'Internal Server Error'
  });

  return (undefined);
};

internals.flatMainCategory = function (m) {
  const flat = {
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

  return flat;
}

function getReportType (req, res, next) {
  const code = req.query.code.toUpperCase();
  switch (code) {
    case 'A':
      query = { code: 'A' };
      break;
    case 'B':
      query = { code: 'B' };
      break;
    case 'C':
      query = { code: 'C' };
      break;
    default:
      query = null;
  }

  if (!query) {
    return next();
  }

  return req.db.ReportType.findOne(query)
    .then((reportType) => {
      req.$scope.reportType = reportType;

      next();
      return (undefined);
    })
    .catch((err) => internals.catchError(err, req, res));
}

function getGeneralCategories (req, res, next) {
  const host = req.$scope.host;
  const reportType = req.$scope.reportType;
  let query;
  
  if (reportType) {
    query = { _host: host._id, reportType: reportType._id };
  } else {
    query = { _host: host._id }
  }
  return req.db.MainCategory.find(query)
    .populate('subCategories', ['_id', 'name', 'description'])
    .populate('_reportType', ['_id', 'code', 'name', 'description'])
    .then((mainCategories) => {
      console.log('loading main cat', mainCategories);
      if (req.query.flat == 'true') {
        req.$scope.mainCategories = mainCategories;
        return next();
      }
      res.status(200).send({
        satus: 'SUCCESS',
        statusCode: 0,
        httpCode: 200,
        data: mainCategories
      });

      return (undefined);
    })
    .catch((err) => internals.catchError(err, req, res));
}

function flatMainCategories (req, res, next) {
  const mainCategories = req.$scope.mainCategories;
  const flatMainCategories = mainCategories.map(mc => {
    const mco = mc.toObject();

    return internals.flatMainCategory(mco);
  });

  res.status(200).send({
    satus: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    data: flatMainCategories
  });

  return (undefined);
}

module.exports = {
  getGeneralCategories,
  getReportType,
  flatMainCategories
};
