const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { ReportType, MainCategory, Host, SubCategory } = require('../../models');
const pWaterfall = require('p-waterfall');
const { mainCategory, authorization } = require('../helpers');


module.exports = {
  Query: {
    mainCategories: async (root, arg, context, info) => {
      const query = {};
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }
      if (arg.hostId) {
        query._host = arg.hostId;
      } else {
        const defaultHost = await Host.findOne({ hostName: {
          $eq: 'default_host'
        } });

        query._host = defaultHost._id;
      }
      if (arg.reportTypeId) {
        query._reportType = reportTypeId;
      } else if (arg.reportTypeCode) {
        const reportType = await ReportType.findOne({ code: arg.reportTypeCode.toUpperCase() });
        query._reportType = reportType._id;
      }
      return MainCategory.find(query);
    },
    mainCategory: (root, {id}, context, info) => {
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) { 
          hasQ = true
          query._id = id;
        }
      }

      if (hasQ) {
        return MainCategory.findOne(query);
      } else {
        return null;
      }

    }
  },
  MainCategory: {
    host: (mainCategory, arg, context, info) =>  Host.findById(mainCategory._host),
    reportType: (mainCategory, arg, context, info) => ReportType.findById(mainCategory._reportType),
    subCategories: (mainCategory, arg, context, info) => SubCategory.find({ _mainCategory: mainCategory._id })
  },
  Mutation: {
    addMainCategory: async (root, arg, { req }, info) => {
      req.body = arg;
      if (!arg.hostId || !mongoose.isValidObjectId(arg.hostId)) {
        const defaultHost = await Host.findOne({ hostName: {
          $eq: 'default_host'
        } });

        req.body.hostId = defaultHost._id;
      }
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          mainCategory._validateParams,
          mainCategory._createMainCategory
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully created main category',
          id: req.$scope.mainCategory && req.$scope.mainCategory._id
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
    deleteMainCategory: async (root, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          mainCategory._deleteMainCategory
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully deleted main category',
          id: req.$scope.mainCategory && req.$scope.mainCategory._id
        };
      } catch (e) {
        req.log.error(e, 'Update Report Error');
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
