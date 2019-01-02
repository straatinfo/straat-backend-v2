const ErrorHelper = require('../helpers/error.helper');
const CategoryHelper = require('../helpers/category.helper');

const subCategoryFormValidator = async (req, res, next) => {
  try {
    const messages = [];

    req.checkBody('name', 'Name cannot be empty').notEmpty();
    
    const checkMainCategory = await CategoryHelper.getMainCategoryById(req.params.mainCategoryId);
    if (checkMainCategory.err && checkMainCategory.mainCategory) {
      return ErrorHelper.ClientError(res, { error: 'Invalid Main Category'}, 400);
    }
    
    const errors = req.validationErrors();

    if (errors) {
      errors.forEach(function (error) {
        messages.push(error.msg);
      });
      return ErrorHelper.ClientError(res, messages, 400);
    }

    next();
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const updateSubCategoryFormValidator = async (req, res, next) => {
  try {
    const messages = [];

    req.checkBody('name', 'Name cannot be empty').notEmpty();
    req.checkBody('_mainCategory', 'Main Category ID cannto be empty').notEmpty();
    
    const checkMainCategory = await CategoryHelper.getMainCategoryById(req.body._mainCategory);
    if (checkMainCategory.err && checkMainCategory.mainCategory) {
      return ErrorHelper.ClientError(res, { error: 'Invalid Main Category'}, 400);
    }
    
    const errors = req.validationErrors();

    if (errors) {
      errors.forEach(function (error) {
        messages.push(error.msg);
      });
      return ErrorHelper.ClientError(res, messages, 400);
    }

    next();
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  subCategoryFormValidator: subCategoryFormValidator,
  updateSubCategoryFormValidator: updateSubCategoryFormValidator
};

