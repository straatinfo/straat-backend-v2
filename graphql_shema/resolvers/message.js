const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { Message, MediaUpload, User, Conversation } = require('../../models');

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

      return Message.find(query);
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
  }
  // Mutation: {
  //   signUp: (root, arg, context, info) => {

  //   }
  // }
};
