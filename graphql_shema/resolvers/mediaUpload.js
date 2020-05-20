const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { MediaUpload } = require('../../models');

module.exports = {
  Query: {
    mediaUploads: (root, arg, context, info) => {
      const query = {};
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }

      return MediaUpload.find(query);
    },
    mediaUpload: (root, {id}, context, info) => {
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) { 
          hasQ = true
          query._id = id;
        }
      }

      if (hasQ) {
        return MediaUpload.findOne(query);
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
