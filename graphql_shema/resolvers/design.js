const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { Design, MediaUpload, Host } = require('../../models');
const pWaterfall = require('p-waterfall');
const { design, authorization } = require('../helpers');

module.exports = {
  Query: {
    designs: (root, arg, context, info) => {
      const query = {};
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }
      if (arg.hostId) {
        query._host = hostId;
      }  

      return Design.find(query);
    },
    design: (root, {id}, context, info) => {
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) { 
          hasQ = true
          query._id = id;
        }
      }

      if (hasQ) {
        return Design.findOne(query);
      } else {
        return null;
      }

    }
  },
  Design: {
    host: (design, arg, context, info) =>  Host.findById(design._host),
    profilePic: (design, arg, context, info) => MediaUpload.findById(design._profilePic),
  },
  Mutation: {
    addDesign: async (root, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          design._validateParams,
          design._createDesign
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully created a design',
          id: req.$scope.design && req.$scope.design._id
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
    updateDesign: async (root, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          design._updateDesign
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully updated a design',
          id: req.$scope.design && req.$scope.design._id
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
