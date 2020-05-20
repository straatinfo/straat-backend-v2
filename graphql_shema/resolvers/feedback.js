const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { Feedback, User } = require('../../models');

module.exports = {
  Query: {
    feedbacks: (root, arg, context, info) => {
      const query = {};
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }
      if (arg.userId) {
        query._user = arg.userId;
      }  

      return Feedback.find(query);
    },
    feedback: (root, {id}, context, info) => {
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) { 
          hasQ = true
          query._id = id;
        }
      }

      if (hasQ) {
        return Feedback.findOne(query);
      } else {
        return null;
      }

    }
  },
  Feedback: {
    user: (feedback, arg, context, info) =>  User.findById(feedback._user),
  }
  // Mutation: {
  //   signUp: (root, arg, context, info) => {

  //   }
  // }
};
