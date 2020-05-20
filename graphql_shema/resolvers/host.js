const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { Host, Role } = require('../../models');
const pWaterfall = require('p-waterfall');
const { host, authorization } = require('../helpers');

module.exports = {
  Query: {
    hosts: (root, arg, context, info) => {
      const query = {
        hostName: {
          $ne: 'default_host'
        }
      };
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }
      return Host.find(query);
    },
    host: (root, {id, email}, context, info) => {
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) { 
          hasQ = true
          query._id = id;
        }
      }

      if (email) {
        hasQ = true
        query.email = email;
      }

      if (hasQ) {
        return Host.findOne(query);
      } else {
        return null;
      }

    }
  },
  Host: {
    role: (root, arg, context, info) => Role.findById(root._role)
  },
  Mutation: {
    setToSpecific: async (root, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          host._validateHostId,
          host._setToSpecific
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully set host to specific',
          id: req.$scope.host && req.$scope.host._id
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
    setToGeneral: async (root, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          host._validateHostId,
          host._setToGeneral
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully set host to general',
          id: req.$scope.host && req.$scope.host._id
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
    activateHost: async (root, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          host._validateHostId,
          host._activateHost
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully activated host',
          id: req.$scope.host && req.$scope.host._id
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
    deactivateHost: async (root, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          host._validateHostId,
          host._deActivateHost
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully deactivated host',
          id: req.$scope.host && req.$scope.host._id
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
    updateHost: async (root, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAuthenticated,
          host._validateHostId,
          host._updateHost
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully updated host',
          id: req.$scope.host && req.$scope.host._id
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
    softRemoveHost: async (root, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          host._validateHostId,
          host._softRemoveHost
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully deleted host',
          id: req.$scope.host && req.$scope.host._id
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
