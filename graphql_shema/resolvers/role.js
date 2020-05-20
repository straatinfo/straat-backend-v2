const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { Role } = require('../../models');

module.exports = {
  Query: {
    roles: (root, arg, context, info) => {
      const query = {};
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }
      return Role.find(query);
    },
    role: (root, {id, code}, context, info) => {
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
        return Role.findOne(query);
      } else {
        return null;
      }

    }
  }
  // Mutation: {
  //   signUp: (root, arg, context, info) => {

  //   }
  // }
};
