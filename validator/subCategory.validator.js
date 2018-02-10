const ErrorHelper = require('../helpers/error.helper');
const CategoryHelper = require('../helpers/category.helper');

const subCategoryFormValidator = async (req, res, next) => {
  try {
    const messages = [];

    req.checkBody('name', 'Name cannot be empty').notEmpty();
    const checkHost = await HostHelper.getHostById(req.params.hostId);
    
    const checkMainCategory = await CategoryHelper.getMainCategoryById(req.params.mainCategoryId);
    if (checkMainCategory.err) {
      return ErrorHelper.ClientError(res, {error: checkMainCategory.err}, 400);
    }
    if (!checkMainCategory.mainCategory) {
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

module.exports = {
  subCategoryFormValidator: subCategoryFormValidator
};

