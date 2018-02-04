// this route handles all Custom Category functions
const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const AdminMiddleware = require('../middlewares/admin.middleware');

const Category = require('../api/category');
const CategoryRoute = express.Router();

CategoryRoute.route('/:hostId')
.get(requireAuth, Category.getMainCategories)
.post(requireAuth, Category.createMainCategory);

CategoryRoute.route('/:hostId/:mainCategoryId')
.put(requireAuth, Category.updateMainCategory)
.delete(requireAuth, Category.deleteMainCategory);

CategoryRoute.route('/sub/:mainCategoryId')
.get(requireAuth, Category.getSubCategories)
.post(requireAuth, Category.createSubCategory);

CategoryRoute.route('/sub/:mainCategoryId/:subCategoryId')
.put(requireAuth, Category.updateSubCategory)
.delete(requireAuth, Category.deleteSubCategory);

module.exports = CategoryRoute;
