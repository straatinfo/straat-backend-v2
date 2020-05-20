const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { Team, User, TeamInvite } = require('../../models');

module.exports = {
  Query: {
    designs: (root, arg, context, info) => {
      const query = {};
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }
      if (arg.userId) {
        query._user = userId;
      }
      if (arg.teamId) {
        query._team = teamId;
      }  

      return TeamInvite.find(query);
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
        return TeamInvite.findOne(query);
      } else {
        return null;
      }

    }
  },
  TeamInvite: {
    user: (teamInvite, arg, context, info) =>  User.findById(teamInvite._user),
    team: (teamInvite, arg, context, info) => Team.findById(teamInvite._team),
  }
  // Mutation: {
  //   signUp: (root, arg, context, info) => {

  //   }
  // }
};
