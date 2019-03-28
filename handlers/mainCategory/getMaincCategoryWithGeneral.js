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

  return req.db.MainCategory.minify({ _host: host._host }, true)
    .then((mainCategories) => {
      req.$scope.mainCategories = mainCategories || [];

      next();

      return (undefined);
    })
    .catch((err) => internals.catchError(err, req, res));
}

// for backwards compatibility
function translate (req, res, next) {
  const mainCategories = req.$scope.mainCategories;
  const lang = req.query.language || 'en';

  if (lang != 'en' || lang != 'nl') {
    lang = 'en';
  }

  const translatedMC = mainCategories.map(mc => {
    mc.name = _.find(mc.translations, (t) => {
      return t.code === lang;
    }).word;

    mc.subCategories.map(sc => {
      sc.name = _.find(sc.translations, (t) => {
        return t.code == lang;
      }).word;

      return sc;
    });

    return mc;
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

module.exports = {
  getMainCategories,
  translate
};