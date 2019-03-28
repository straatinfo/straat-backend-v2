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

function getMainCategories (req, res, next) {
  const host = req.$scope.host;
  console.log(host);

  return req.db.MainCategory.find({ _host: host._host })
    .populate('subCategories', ['_id', 'name', 'description'])
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
  console.log('translating');
  try {
    const mainCategories = req.$scope.mainCategories;
    console.log(mainCategories);
    let lang = req.query.language || 'en';

    if (lang != 'en' || lang != 'nl') {
      lang = 'en';
    }

    const translatedMC = mainCategories.map(mc => {
      const mco = mc.toObject();
      console.log(mco, mco.translations);
      mco.name = _.find(mco.translations, (t) => {
        return t.code == lang;
      }).word;

      console.log(mco.name);

      mco.subCategories.map(sc => {
        const sco = sc.toObject();
        sco.name = _.find(sco.translations, (t) => {
          return t.code == lang;
        }).word;

        return sco;
      });
      console.log(mco);
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
  getMainCategories,
  translate
};
