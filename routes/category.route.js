// this route handles all Custom Category functions
const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const MainCategoryValidator = require('../validator/mainCategory.validator');
const SubCategoryValidator = require('../validator/subCategory.validator');
const CategoryMiddleware = require('../middleware/category.middleware');
const TransMaincategory = require('../middleware/transMaincategory');

const Category = require('../api/category');
const CategoryRoute = express.Router();

const mainCategoryHandlers = require('../handlers/mainCategory');
const subCategoryHandlers = require('../handlers/subCategory');

// CategoryRoute.route('/mainCategory/hostId/:hostId')
// .get(/*requireAuth,*/ Category.getMainCategories, CategoryMiddleware.getFlatMainCategory)
// .post(/*requireAuth,*/ /*MainCategoryValidator.mainCategoryFormValidator, */ Category.createMainCategoryForHost);

CategoryRoute.route('/mainCategory/hostId/:hostId')
.get(
  /*requireAuth,*/
  mainCategoryHandlers.getMainCategories.checkHost,
  mainCategoryHandlers.getMainCategories.checkReportType,
  mainCategoryHandlers.getMainCategories.getMainCategories,
  mainCategoryHandlers.getMainCategories.flatMainCategories
)
.post(
  /*requireAuth,*/
  mainCategoryHandlers.createMainCategoryForHost.validateParams,
  mainCategoryHandlers.createMainCategoryForHost.checkHost,
  mainCategoryHandlers.createMainCategoryForHost.checkReportType,
  mainCategoryHandlers.createMainCategoryForHost.addMainCategory,
  mainCategoryHandlers.createMainCategoryForHost.updateHost,
  mainCategoryHandlers.createMainCategoryForHost.updateReportType,
  mainCategoryHandlers.createMainCategoryForHost.response
);

CategoryRoute.route('/mainCategory/:mainCategoryId')
.put(/*requireAuth,*/ MainCategoryValidator.updateMainCategoryFormValidator, Category.updateMainCategory)
.delete(/*requireAuth,*/ Category.deleteMainCategory);

CategoryRoute.route('/mainCategory/reportTypeId/:reportTypeId')
.get(/* requireAuth, */ Category.getMainCategoriesByReportType, CategoryMiddleware.getFlatMainCategory);

// CategoryRoute.route('/subCategory/mainCategoryId/:mainCategoryId')
// .get(/*requireAuth,*/ Category.getSubCategories, CategoryMiddleware.getFlatSubCategory)
// .post(/*requireAuth,*/ SubCategoryValidator.subCategoryFormValidator, Category.createSubCategory);

CategoryRoute.route('/subCategory/mainCategoryId/:mainCategoryId')
.get(/*requireAuth,*/
  subCategoryHandlers.getSubCategories.logic,
  subCategoryHandlers.getSubCategories.flatSubCategories
)
.post(/*requireAuth,*/
  subCategoryHandlers.createSubCategory.validateParams,
  subCategoryHandlers.createSubCategory.createSubCategory,
  subCategoryHandlers.createSubCategory.updateMainCategory,
  subCategoryHandlers.createSubCategory.respond,
  subCategoryHandlers.getSubCategories.flatSubCategories
);

CategoryRoute.route('/subCategory/:subCategoryId')
.put(/*requireAuth,*/ SubCategoryValidator.updateSubCategoryFormValidator, Category.updateSubCategory)
.delete(/*requireAuth,*/ Category.deleteSubCategory);

// CategoryRoute.route('/mainCategory/withGeneral/hostId/:hostId')
// .get(/*requireAuth,*/ Category.getMainCategoriesWithGeneral, TransMaincategory.translate, CategoryMiddleware.getFlatMainCategory);

CategoryRoute.route('/mainCategory/withGeneral/hostId/:hostId')
.get(
  /*requireAuth,*/
  mainCategoryHandlers.getMainCategories.checkHost,
  function (req, res, next) {
    const host = req.$scope.host;
    if (!host.isSpecific || host.isSpecific == false) {
      return mainCategoryHandlers.createMainCategoryForHost.getFreeHost(req, res, next);
    }
    return next();
  },
  mainCategoryHandlers.getMainCategoriesWithGeneral.getReportTypeA,
  mainCategoryHandlers.getMainCategoriesWithGeneral.getMainCategories,
  mainCategoryHandlers.getMainCategoriesWithGeneral.translate
);


// CategoryRoute.route('/mainCategory/general')
// .get(/*requireAuth,*/ Category.getGeneralMainCategories, TransMaincategory.translate, CategoryMiddleware.getFlatMainCategory)
// .post(/*requireAuth,*/  Category.createGeneralMainCategory);

CategoryRoute.route('/mainCategory/general')
.get(/*requireAuth,*/
  mainCategoryHandlers.createMainCategoryForHost.getFreeHost,
  mainCategoryHandlers.getGeneralMainCategories.getReportType,
  mainCategoryHandlers.getGeneralMainCategories.getGeneralCategories,
  mainCategoryHandlers.getGeneralMainCategories.flatMainCategories
)
.post(
  /*requireAuth,*/
  mainCategoryHandlers.createMainCategoryForHost.validateParams,
  mainCategoryHandlers.createMainCategoryForHost.getFreeHost,
  mainCategoryHandlers.createMainCategoryForHost.checkReportType,
  mainCategoryHandlers.createMainCategoryForHost.addMainCategory,
  mainCategoryHandlers.createMainCategoryForHost.updateHost,
  mainCategoryHandlers.createMainCategoryForHost.updateReportType,
  mainCategoryHandlers.createMainCategoryForHost.response
);

// CategoryRoute.route('/app/mainCategory/withGeneral/hostId/:hostId')
// .get(/*requireAuth,*/ Category.getAppMainCategoriesWithGeneral, TransMaincategory.translate, CategoryMiddleware.getFlatMainCategory);

CategoryRoute.route('/app/mainCategory/withGeneral/hostId/:hostId')
.get(/*requireAuth,*/
  mainCategoryHandlers.getMainCategories.checkHost,
  function (req, res, next) {
    const host = req.$scope.host;
    if (!host.isSpecific || host.isSpecific == false) {
      return mainCategoryHandlers.createMainCategoryForHost.getFreeHost(req, res, next);
    }
    return next();
  },
  mainCategoryHandlers.getMainCategoriesWithGeneral.getReportTypeA,
  mainCategoryHandlers.getMainCategoriesWithGeneral.getMainCategories,
  mainCategoryHandlers.getMainCategoriesWithGeneral.translate
);

CategoryRoute.route('/app/mainCategory/general')
.get(/*requireAuth,*/
  mainCategoryHandlers.createMainCategoryForHost.getFreeHost,
  mainCategoryHandlers.getMainCategoriesWithGeneral.setReportTypeCode,
  mainCategoryHandlers.getMainCategoriesWithGeneral.getMainCategories,
  mainCategoryHandlers.getMainCategoriesWithGeneral.translate
);


module.exports = CategoryRoute;
