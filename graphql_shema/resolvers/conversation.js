const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { Conversation, MediaUpload, Message, User } = require('../../models');

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
    participants: (conversation, arg, context, info) =>  {
      console.log(conversation)
    },
    messages: async (conversation, arg, context, info) => {
      if (arg && arg.receiverId) {
        return await Message.find({ _conversation: conversation._id, _recevier: arg.receiverId })
      } else {
        return [];
      }
    },
  },
  Mutation: {
    
  }
};
