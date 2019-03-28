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

function getGeneralCategories (req, res, next) {
  const host = req.$scope.host;
  const code = req.query.code.toUpperCase();
  let query;
  console.log(host, code);
  switch (code) {
    case 'A':
      query = { _host: host._id, code: 'A' };
      break;
    case 'B':
      query = { _host: host._id, code: 'B' };
      break;
    case 'C':
      query = { _host: host._id, code: 'C' };
      break;
    default:
      query = { _host: host._id };
  }

  return req.db.MainCategory.find(query)
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
  flatMainCategories
};