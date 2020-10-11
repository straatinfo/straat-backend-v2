const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { Message, MediaUpload, User, Conversation } = require('../../models');

const {
  authorization,
  sendMessage,
  editMessage,
  deleteMessage
} = require('../helpers');

module.exports = {
  Query: {
    messages: (root, arg, context, info) => {
      const query = {};
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }
      if (arg.userId) {
        query._author = userId;
      }

      if (arg.conversationId) {
        query._conversation = conversationId;
      }
      let messageQuery = Message.find(query);

      if (arg.sort && arg.sort.field) {
        const order = arg.sort && arg.sort.asc ? 1 : -1;
        const field = arg.sort.field;
        messageQuery = messageQuery.sort([field, order]);
      }

      return messageQuery;
    },
    message: (root, {id}, context, info) => {
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) { 
          hasQ = true
          query._id = id;
        }
      }

      if (hasQ) {
        return Message.findOne(query);
      } else {
        return null;
      }

    }
  },
  Message: {
    author: (message, arg, context, info) =>  User.findById(message._author),
    conversation: (message, arg, context, info) => Conversation.findById(message._conversation),
    attachments: (message, arg, context, info) => {
      console.log(message);
    },
  },
  Mutation: {
    sendMessage: async (root, arg, context, info) => {
      context.req.body = arg;
      try {
        const req = await pWaterfall([
          authorization._isAuthenticated,
          sendMessage._verifyType,
          sendMessage._verifyConversationOrCreate,
          sendMessage._createMessage,
          sendMessage._createUnreadMessages,
          sendMessage._broadCast
        ], context.req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully sent a message',
          id: req.$scope.message && req.$scope.message._id,
          conversationId: req.$scope.conversation && req.$scope.conversation._id
        };
      } catch (e) {
        context.req.log.error(e, 'Send Message');
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
    },
    editMessage: async (root, arg, context, info) => {
      context.req.body = arg;
      try {
        const req = await pWaterfall([
          authorization._isAuthenticated,
          editMessage.verifyUser,
          editMessage.editMessage
        ], context.req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully updated a message',
          id: req.$scope.message && req.$scope.message._id
        };
      } catch (e) {
        context.req.log.error(e, 'Edit Message');
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
    },
    deleteMessage: async (root, arg, context, info) => {
      context.req.body = arg;
      try {
        const req = await pWaterfall([
          authorization._isAuthenticated,
          editMessage.verifyUser,
          deleteMessage.deleteMessage,
          deleteMessage.deleteUnreadMessage
        ], context.req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully deleted a message',
          id: req.$scope.message && req.$scope.message._id
        };
      } catch (e) {
        context.req.log.error(e, 'Delete Message');
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
