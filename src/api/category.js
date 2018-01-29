const ErrorHelper = require('../helpers/error.helper');
const CategoryHelper = require('../helpers/category.helper');

// route: /:hostId
const getMainCategories = async (req, res, next) => {
  const { hostId } = req.params;
  try {
    const getMainCategories = await CategoryHelper.getMainCategories(hostId);
    if (getMainCategories.err) {
      ErrorHelper.clientError(res, 400, getMainCategories.err);
      return;
    }
    res.status(200).send(getMainCategories.mainCategories);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const createMainCategory = async (req, res, next) => {
  const { hostId } = req.params;
  const { name, description, reportTypeId } = req.body;
  try {
    const createMainCategory = await CategoryHelper.createMainCategory(hostId, name, description, reportTypeId);
    if (createMainCategory.err) {
      ErrorHelper.clientError(res, 400, createMainCategory.err);
      return;
    }
    res.status(200).send(createMainCategory.mainCategory);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

// route: /:hostId/:mainCategoryId
const updateMainCategory = async (req, res, next) => {
  const { mainCategoryId } = req.params;
  const { name, description } = req.body;
  try {
    const updatedMainCategory = await CategoryHelper.updateMainCategory(mainCategoryId, name, description);
    if (updatedMainCategory.err) {
      ErrorHelper.clientError(res, 400, updatedMainCategory.err);
      return;
    }
    res.status(200).send(updatedMainCategory.mainCategory);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const deleteMainCategory = async (req, res, next) => {
  const { mainCategoryId } = req.params;
  try {
    const deletedMainCategory = await CategoryHelper.deleteMainCategory(mainCategoryId);
    if (deletedMainCategory.err) {
      ErrorHelper.clientError(res, 400, deletedMainCategory.err);
      return;
    }
    res.status(200).send({affectedRows: deletedMainCategory.affectedRows});
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

// route: /sub/:mainCategoryId
const getSubCategories = async (req, res, next) => {
  const { mainCategoryId } = req.params;
  try {
    const getSub = await CategoryHelper.getSubCategories(mainCategoryId);
    if (getSub.err) {
      ErrorHelper.clientError(res, 400, getSub.err);
      return;
    }
    res.status(200).send(getSub.subCategories);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const createSubCategory = async (req, res, next) => {
  const { mainCategoryId } = req.params;
  const { name, description } = req.body;
  try {
    const createSub = await CategoryHelper.createSubCategory(mainCategoryId, name, description);
    if (createSub.err) {
      ErrorHelper.clientError(res, 400, createSub.err);
      return;
    }
    res.status(200).send(createSub.subCategory);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

// route: /sub/:mainCategoryId/:subCategoryId
const updateSubCategory = async (req, res, next) => {
  const { mainCategoryId, subCategoryId } = req.params;
  const { name, description } = req.body;
  try {
    const updatedSub = await CategoryHelper.updateSubCategory(subCategoryId, name, description);
    if (updatedSub.err) {
      ErrorHelper.clientError(res, 400, updatedSub.err);
      return;
    }
    res.status(200).send(updatedSub.subCategory);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const deleteSubCategory = async (req, res, next) => {
  const { subCategoryId } = req.params;
  try {
    const deletedSub = await CategoryHelper.deleteSubCategory(subCategoryId);
    if (deletedSub.err) {
      ErrorHelper.clientError(res, 400, deletedSub.err);
      return;
    }
    res.status(200).send({affectedRows: deletedSub.affectedRows});
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

module.exports = {
  createMainCategory: createMainCategory,
  getMainCategories: getMainCategories,
  updateMainCategory: updateMainCategory,
  deleteMainCategory: deleteMainCategory,
  getSubCategories: getSubCategories,
  createSubCategory: createSubCategory,
  updateSubCategory: updateSubCategory,
  deleteSubCategory: deleteSubCategory
};
