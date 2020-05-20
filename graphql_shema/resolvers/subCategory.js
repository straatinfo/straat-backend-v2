const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { MainCategory, SubCategory } = require('../../models');
const pWaterfall = require('p-waterfall');
const { subCategory, authorization } = require('../helpers');

module.exports = {
  Query: {
    subCategories: (root, arg, context, info) => {
      const query = {};
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }
      if (arg.mainCategoryId) {
        query._mainCategory = arg.mainCategoryId;
      }
      return SubCategory.find(query);
    },
    subCategory: (root, {id}, context, info) => {
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) { 
          hasQ = true
          query._id = id;
        }
      }

      if (hasQ) {
        return SubCategory.findOne(query);
      } else {
        return null;
      }

    }
  },
  SubCategory: {
    mainCategory: (mainCategory, arg, context, info) =>  MainCategory.findById(mainCategory._mainCategory)
  },
  Mutation: {
    addSubCategory: async (root, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          subCategory._validateParams,
          subCategory._createSubCategory
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully created sub category',
          id: req.$scope.subCategory && req.$scope.subCategory._id
        };
      } catch (e) {
        context.req.log.error(e, 'Update Report Error');
        if (e.status && e.statusCode) {
          return e;
        }
        return {
          status: 'ERROR',
          statusCode: 100,
          httpCode: 500,
          message: 'Internal server error'
        };
      }
    },
    deleteSubCategory: async (root, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          subCategory._deleteSubCategory
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully deleted sub category',
          id: req.$scope.subCategory && req.$scope.subCategory._id
        };
      } catch (e) {
        context.req.log.error(e, 'Update Report Error');
        if (e.status && e.statusCode) {
          return e;
        }
        return {
          status: 'ERROR',
          statusCode: 100,
          httpCode: 500,
          message: 'Internal server error'
        };
      }
    }
  }
};
