const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const CategoryHelper = require('../helpers/category.helper');

const getFlatMainCategory = async (req, res, next) => {
  try {
    if (!req.mainCategories) {
      return ErrorHelper.ClientError(res, {error: 'Invalid MainCategories'});
    }
    const flatMainCategories = await Promise.all(req.mainCategories.map(async(m) => {
      try {
        const flatMC = await CategoryHelper.flatMainCategory(m);
        if (flatMC.mainCategory) {
          return flatMC.mainCategory;
        }
      }
      catch (e) {

      }
    }));
    SuccessHelper.success(res, flatMainCategories);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getFlatSubCategory = async (req, res, next) => {
  try {
    if (!req.subCategories) {
      return ErrorHelper.ClientError(res, {error: 'Invalid SubCategories'});
    }
    const flatSubCategories = await Promise.all(req.subCategories.map(async(s) => {
      try {
        const flatSC = await CategoryHelper.flatSubCategory(s);
        if (flatSC.subCategory) {
          return flatSC.subCategory;
        }
      }
      catch (e) {}
    }));
    SuccessHelper.success(res, flatSubCategories);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getFlatMainCategory: getFlatMainCategory,
  getFlatSubCategory: getFlatSubCategory
};
