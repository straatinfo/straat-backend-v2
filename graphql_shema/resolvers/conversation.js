const mongoose = require('mongoose');
const pWaterfall = require('p-waterfall');
const { gql } = require('apollo-server-express');

const { Conversation, MediaUpload, Message, User } = require('../../models');

const {
  nearReports,
  publicReports,
  sendReport,
  updateReport,
  joinConversation,
  authorization } = require('../helpers');
const { join } = require('lodash');

module.exports = {
  Query: {
    conversations: (root, {userId}, context, info) => {
      const query = {};

      if (userId) {
        query['participants._id'] = userId;
      }

      return Conversation.find(query);
    },
    conversation: (root, {id}, context, info) => {
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) { 
          hasQ = true
          query._id = id;
        }
      }

      if (hasQ) {
        return Conversation.findOne(query);
      } else {
        return null;
      }

    }
  },
  Conversation: {
    participants: (conversation, arg, context, info) =>  User.find({
      _id: {
        $in: conversation.participants.map(id => id.toString())
      }
    }),
    messages: async (conversation, arg, context, info) => {
      if (arg && arg.receiverId) {
        return await Message.find({ _conversation: conversation._id, _recevier: arg.receiverId })
      } else {
        return [];
      }
    },
  },
  Mutation: {
    joinConversation: async (root, arg, context, info) => {
      context.req.body = arg;
      try {
        const req = await pWaterfall([
          authorization._isAuthenticated,
          joinConversation.join
        ], context.req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully created a report',
          id: req.$scope.conversation && req.$scope.conversation._id
        };
      } catch (e) {
        context.req.log.error(e, 'Join conversation');
        if (e && e.status && e.httpCode) {
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
