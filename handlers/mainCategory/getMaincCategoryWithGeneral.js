const _ = require('lodash');

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
}

function getReportTypeA (req, res, next) {
  req.db.ReportType.findOne({ code: 'A' })
    .then((reportType) => {
      req.$scope._reportType = reportType && reportType._id ? reportType._id : null;
      next();
    })
}

function setReportTypeCode (req, res, next) {
  const code = req.query.code || 'ABC';
  const codeList = code.split('');
  return req.db.ReportType.find({
    $or: codeList.map(c => ({ code: c }))
  })
    .then((reportTypes) => {
      console.log('report types', reportTypes)
      if (reportTypes.length > 0) {
        const codeQuery = { $in: reportTypes.map(rt => rt._id) }
        console.log('code query', codeQuery);
        req.$scope.codeQuery = codeQuery
      }
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function getMainCategories (req, res, next) {
  console.log('loading main categories');
  const host = req.$scope.host;
  const type = req.query.type;

  const query = { _host: host._id };

  if (req.params && req.params.hostId && req.$scope._reportType) {
    query._reportType = req.$scope._reportType;
  }

  if (req.$scope.codeQuery) {
    query._reportType = codeQuery;
  }

  console.log('query', query);

  return req.db.MainCategory.find(query)
    .populate('subCategories')
    .populate('_reportType', ['_id', 'code', 'name', 'description'])
    .then((mainCategories) => {
      console.log('main categories fetched', mainCategories);
      req.$scope.mainCategories = mainCategories;
      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

// for backwards compatibility
function translate (req, res) {
  console.log('loading translations');
  try {
    const mainCategories = req.$scope.mainCategories;
    let lang = req.query.language || 'en';

    if (lang == 'nl') {
      lang = 'nl';
    } else {
      lang = 'en';
    }
    const translatedMC = mainCategories.map(mc => {
      const mco = mc.toObject();
      mco.name = _.find(mco.translations, (t) => {
        return t.code == lang;
      }).word;

      const subCategories = mco.subCategories.map(sc => {
        console.log(sc);
        try {
          const tsc = _.find(sc.translations, (t) => {
            console.log(t.code == lang);
            return t.code == lang;
          });
  
          sc.name = tsc.word;
        } catch (e) {
          console.log(e);
        }

        return sc;
      });

      mco.subCategories = subCategories;

      return mco;
    });

    console.log('Successfully fetch data', translatedMC);

    res.status(200).send({
      status: 1, // for backwards compatibility
      statusCode: 0,
      httpCode: 200,
      message: null,
      data: translatedMC
    });
  
    return (undefined);
  }
  catch (e) {
    internals.catchError(e, req, res);
    return (undefined);
  }

}

module.exports = {
  getReportTypeA,
  setReportTypeCode,
  getMainCategories,
  translate
};
