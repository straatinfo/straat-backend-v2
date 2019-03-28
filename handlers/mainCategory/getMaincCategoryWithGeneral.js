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

  return req.db.MainCategory.find({ _host: host._id })
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
  try {
    const mainCategories = req.$scope.mainCategories;
    let lang = req.query.language || 'en';

    if (lang = 'nl') {
      lang = 'nl';
    } else {
      lang = 'en';
    }
    const translatedMC = mainCategories.map(mc => {
      const mco = mc.toObject();
      mco.name = _.find(mco.translations, (t) => {
        return t.code == lang;
      }).word;

      mco.subCategories.map(sc => {
        const sco = sc.toObject();
        sco.name = _.find(sco.translations, (t) => {
          return t.code == lang;
        }).word;

        return sco;
      });
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
