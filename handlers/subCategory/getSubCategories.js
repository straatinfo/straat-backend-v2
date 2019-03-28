
const internals = {};

internals.catchError = function (err, req, res) {
  console.log(err);

  res.status(500).send({
    status: 'SUCCESS',
    statusCode: 100,
    httpCode: 500,
    message: 'Internal Server Error'
  });
};

internals.flatSubCategory = function (s) {
  return {
    _id: s._id || null,
    name: s.name || null,
    createdAt: s.createdAt || null,
    updatedAt: s.updatedAt || null,
    '_mainCategory._id': (s._mainCategory && s._mainCategory._id) ? s._mainCategory._id : null,
    '_mainCategory.name': (s._mainCategory && s._mainCategory.name) ? s._mainCategory.name : null,
    translations: s.translations || []
  };
};

function logic (req, res, next) {
  const { mainCategoryId } = req.params;

  return req.db.SubCategory.find({ _mainCategory: mainCategoryId })
    .populate('_mainCategory')
    .then((subCategories) => {
      if (req.query.flat == 'true') {
        req.$scope.subCategories = subCategories;
        return next();
      }

      res.status(200).send({
        status: 'SUCCESS',
        statusCode: 0,
        httpCode: 200,
        data: subCategories
      });

      return (undefined);
    })
    .catch((err) => internals.catchError(err, req, res));
}

function flatSubCategories (req, res, next) {
  const subCategories = req.$scope.subCategories || [];

  const flatSC = subCategories.map(internals.flatSubCategory);

  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    data: flatSC
  });

  return (undefined);
}

module.exports = {
  logic,
  flatSubCategories
};
