// this route handles all Custom Category functions
const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const MainCategoryValidator = require('../validator/mainCategory.validator');
const SubCategoryValidator = require('../validator/subCategory.validator');

const Category = require('../api/category');
const CategoryRoute = express.Router();

CategoryRoute.route('/:hostId')
.get(/*requireSignin,*/ Category.getMainCategories)
.post(/*requireSignin,*/MainCategoryValidator.mainCategoryFormValidator, Category.createMainCategory);

CategoryRoute.route('/:hostId/:mainCategoryId')
.put(/*requireSignin,*/ Category.updateMainCategory)
.delete(/*requireSignin,*/ Category.deleteMainCategory);

CategoryRoute.route('/sub/:mainCategoryId')
.get(/*requireSignin,*/ Category.getSubCategories)
.post(/*requireSignin,*/ SubCategoryValidator.subCategoryFormValidator, Category.createSubCategory);

CategoryRoute.route('/sub/:mainCategoryId/:subCategoryId')
.put(/*requireSignin,*/ Category.updateSubCategory)
.delete(/*requireSignin,*/ Category.deleteSubCategory);

module.exports = CategoryRoute;
