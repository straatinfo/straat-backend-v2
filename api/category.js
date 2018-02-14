const CategoryHelper = require('../helpers/category.helper');
const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');

const getMainCategories = async (req, res, next) => {
  const { hostId } = req.params;
  try {
    const getMC = await CategoryHelper.getMainCategories(hostId);
    if (getMC.err) {
      return ErrorHelper.ClientError(res, {error: getMC.err}, 400);
    }
    SuccessHelper.success(res, getMC.mainCategories);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const createMainCategory = async (req, res, next) => {
  const { hostId } = req.params;
  try {
    const createMC = await CategoryHelper.createMainCategory({...req.body, '_host': hostId});
    if (createMC.err) {
      return resolve({err: createMC.err});
    }
    SuccessHelper.success(res, createMC.mainCategory);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const updateMainCategory = async (req, res, next) => {
  const { mainCategoryId } = req.params;
  try {
    const updateMC = await CategoryHelper.updateMainCategory(mainCategoryId, req.body);
    if (updateMC.err) {
      return ErrorHelper.ClientError(res, { error: updateMC.errr}, 400);
    }
    SuccessHelper.success(res, updateMC.mainCategory);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getMainCategoriesByReportType = async (req,res, next) => {
  const { reportTypeId } = req.params;
  try {
    const getMCBRT = await CategoryHelper.getMainCategoriesByReportType(reportTypeId);
    if (getMCBRT.err) {
      return ErrorHelper.ClientError(res, {error: getMCBRT.err}, 400);
    }
    SuccessHelper.success(res, getMCBRT.mainCategories);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const deleteMainCategory = async (req, res, next) => {
  const { mainCategoryId } = req.params;
  try {
    const deleteMC = await CategoryHelper.deleteMainCategory(mainCategoryId);
    if (deleteMC.err) {
      return ErrorHelper.ClientError(res, {error: deleteMC.err}, 400);
    }
    SuccessHelper.success(res, deleteMC.mainCategory);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getSubCategories = async (req, res, next) => {
  const { mainCategoryId } = req.params;
  try {
    const getSC = await CategoryHelper.getSubCategories(mainCategoryId);
    if (getSC.err) {
      return ErrorHelper.ClientError(res, { err: getSC.err}, 400);
    }
    SuccessHelper.success(res, getSC.subCategories);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const createSubCategory = async (req, res, next) => {
  const { mainCategoryId } = req.params;
  try {
    const createSC = await CategoryHelper.createSubcategory({...req.body, '_mainCategory': mainCategoryId});
    if (createSC.err) {
      return ErrorHelper.ClientError(res, { err: createSC.err }, 400);
    }
    SuccessHelper.success(res, createSC.subCategory);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const updateSubCategory = async (req, res, next) => {
  const { subCategoryId } = req.params;
  try {
    const updateSC = await CategoryHelper.updateSubCategory(subCategoryId, req.body);
    if (updateSC.err) {
      return ErrorHelper.ClientError(res, {error: updateSC.err}, 400);
    }
    SuccessHelper.success(res, updateSC.subCategory);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const deleteSubCategory = async (req, res, next) => {
  const { subCategoryId } = req.params;
  try {
    const deleteSC = await CategoryHelper.deleteSubCategory(subCategoryId);
    if (deleteSC.err) {
      return ErrorHelper.ClientError(res, { error: deleteSC.err}, 400);
    }
    SuccessHelper.success(res, deleteSC.subCategory);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getMainCategories: getMainCategories,
  createMainCategory: createMainCategory,
  updateMainCategory: updateMainCategory,
  deleteMainCategory: deleteMainCategory,
  getSubCategories: getSubCategories,
  createSubCategory: createSubCategory,
  updateSubCategory: updateSubCategory,
  deleteSubCategory: deleteSubCategory,
  getMainCategoriesByReportType: getMainCategoriesByReportType
};
