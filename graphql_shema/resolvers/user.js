const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { User, Host, Role, TeamMember } = require('../../models');
const passport = require('passport');
const pWaterfall = require('p-waterfall');
const { updateUser, authorization } = require('../helpers');

module.exports = {
  Query: {
    users: (root, arg, context, info) => {
      const query = {
        username: {
          $ne: 'admin'
        }
      };
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }
      if (arg.hostId) {
        query._host = arg.hostId;
      }
      return User.find(query);
    },
    user: (root, {id, email}, {req, res}, info) => {
      if ((!id && !email) && req.user && req.user._id) {
        return User.findById(req.user._id);
      }
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          hasQ = true
          query._id = id;
        }
      }

      if (email) {
        hasQ = true;
        query.email = email;
      }

      if (hasQ) {
        return User.findOne(query);
      } else {
        return null;
      }

    }
  },
  User: {
    host: (user, args, context, info) => {
      return Host.findById(user._host);
    },
    role: (user, arg, context, info) => Role.findById(user._role),
    teamMembers: (user, arg, context, info) => TeamMember.find({ _user: user._id })
  },
  Mutation: {
    // signUp: (root, arg, context, info) => {

    // },
    blockUser: async (user, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          updateUser._blockUser
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully blocked a user',
          id: req.$scope.updatedUser && req.$scope.updatedUser._id
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
    },
    unblockUser: async (user, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          updateUser._unblockUser
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully unblocked a user',
          id: req.$scope.updatedUser && req.$scope.updatedUser._id
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
    },
    softRemoveUser: async (user, arg, { req }, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          authorization._isAdmin,
          updateUser._softRemoveUser
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully removed a user',
          id: req.$scope.updatedUser && req.$scope.updatedUser._id
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
