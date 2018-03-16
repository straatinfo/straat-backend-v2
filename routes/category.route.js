// this route handles all Custom Category functions
const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const MainCategoryValidator = require('../validator/mainCategory.validator');
const SubCategoryValidator = require('../validator/subCategory.validator');

const Category = require('../api/category');
const CategoryRoute = express.Router();

CategoryRoute.route('/mainCategory/hostId/:hostId')
.get(/*requireAuth,*/ Category.getMainCategories)
.post(/*requireAuth,*/ MainCategoryValidator.mainCategoryFormValidator, Category.createMainCategory);

CategoryRoute.route('/mainCategory/:mainCategoryId')
.put(/*requireAuth,*/ MainCategoryValidator.updateMainCategoryFormValidator, Category.updateMainCategory)
.delete(/*requireAuth,*/ Category.deleteMainCategory);

CategoryRoute.route('/mainCategory/reportTypeId/:reportTypeId')
.get(/* requireAuth, */ Category.getMainCategoriesByReportType);

CategoryRoute.route('/subCategory/mainCategoryId/:mainCategoryId')
.get(/*requireAuth,*/ Category.getSubCategories)
.post(/*requireAuth,*/ SubCategoryValidator.subCategoryFormValidator, Category.createSubCategory);

CategoryRoute.route('/subCategory/:subCategoryId')
.put(/*requireAuth,*/ SubCategoryValidator.updateSubCategoryFormValidator, Category.updateSubCategory)
.delete(/*requireAuth,*/ Category.deleteSubCategory);

CategoryRoute.route('/mainCategory/withGeneral/hostId/:hostId')
.get(/*requireAuth,*/ Category.getMainCategoriesWithGeneral);

module.exports = CategoryRoute;
