const CategoryHelper = require('../../helpers/category.helper');
const lib = require('../../lib');

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

function validateParams (req, res, next) {
  var schema = {
    name: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Name'
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

function createSubCategory (req, res, next) {
  const { mainCategoryId } = req.params
  const { name, description, nl } = req.body

  const newSubCategory = req.db.SubCategory({
    _mainCategory: mainCategoryId,
    name: name,
    description: description,
    translations: [
      { code: 'en', word: name },
      { code: 'nl', word: nl }
    ]
  });

  return newSubCategory.save()
    .then((subCategory) => {
      req.$scope.subCategory = subCategory;

      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function updateMainCategory (req, res, next) {
  const { mainCategoryId } = req.params
  const subCategory = req.$scope.subCategory;

  return req.db.MainCategory.findByIdAndUpdate(mainCategoryId,
    { '$addToSet': { 'subCategories': subCategory._id } },
    { 'new': true, 'upsert': true })
    .then((mainCategory) => {
      req.$scope.mainCategory = mainCategory;

      next();
    })
    .catch((err) => internals.catchError(err, req, res));
}

function respond (req, res, next) {
  const subCategory = req.$scope.subCategory;

  if (req.query.flat == 'true') {
    return next();
  }

  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    data: subCategory
  });

  return (undefined);
}

module.exports = {
  validateParams,
  createSubCategory,
  updateMainCategory,
  respond
};
