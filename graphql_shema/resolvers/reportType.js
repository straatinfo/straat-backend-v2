const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { ReportType, MainCategory, Host } = require('../../models');

module.exports = {
  Query: {
    reportTypes: (root, arg, context, info) => {
      const query = {};
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }
      return ReportType.find(query);
    },
    reportType: (root, {id, code}, context, info) => {
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) { 
          hasQ = true
          query._id = id;
        }
      }

      if (code) {
        hasQ = true
        query.code = code;
      }

      if (hasQ) {
        return ReportType.findOne(query);
      } else {
        return null;
      }

    }
  },
  ReportType: {
    mainCategories: async (reportType, { hostId }, context, info) =>  {
      const query = {
        _reportType: reportType.id
      };

      if (hostId && mongoose.isValidObjectId(hostId)) {
        query._host = hostId
      } else {
        const defaultHost = await Host.findOne({ hostName: 'default_host' });
        query._host = defaultHost._id;
      }
      
      return MainCategory.find(query);
    }
  }
  // Mutation: {
  //   signUp: (root, arg, context, info) => {

  //   }
  // }
};
