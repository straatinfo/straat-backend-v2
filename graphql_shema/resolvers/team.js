const mongoose = require('mongoose');
const pWaterfall = require('p-waterfall');
const { gql } = require('apollo-server-express');
const { Host, Conversation, MediaUpload, Team, TeamMember, TeamInvite } = require('../../models');
const helpers = require('../helpers');

module.exports = {
  Query: {
    teams: (root, arg, context, info) => {
      const query = {};
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }
      if (arg.hostId) {
        query._host = arg.hostId;
      }
      if (arg.isVolunteer || typeof arg.isVolunteer == 'boolean') {
        query.isVolunteer = arg.isVolunteer;
      }

      return Team.find(query);
    },
    team: (root, {id}, context, info) => {
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) { 
          hasQ = true
          query._id = id;
        }
      }

      if (hasQ) {
        return Team.findOne(query);
      } else {
        return null;
      }

    },
    unJoinedTeams: async (root, { hostId, userId }, { req }, info) => {
      if (!mongoose.isValidObjectId(hostId) && !mongoose.isValidObjectId(userId)) {
        return [];
      }
      const teamMembers = await req.db.TeamMember.find({ _user: userId });
      const teams = await req.db.Team.find({
        $and: [
          { _host: hostId, softRemoved: false },
          {
            _id: {
              $nin: teamMembers.map(tm => tm._team)
            }
          }
        ]
      });

      return teams;
    }
  },
  Team: {
    host: (team, arg, context, info) =>  Host.findById(team._host),
    profilePic: (team, arg, context, info) => MediaUpload.findById(team._profilePic),
    conversation: (team, arg, context, info) => Conversation.findById(team._conversation),
    teamMembers: (team, arg, context, info) => TeamMember.find({ _team: team._id }),
    teamInvites: (team, arg, context, info) => TeamInvite.find({ _team: team._team })
  },
  Mutation: {
    createTeam: async (root, arg, {req}, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          helpers.authorization._isAuthenticated,
          helpers.team._validateCreateParams,
          helpers.team._createTeam
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully created a team',
          id: req.$scope.team && req.$scope.team._id
        };
      } catch (e) {
        req.log.error(e, 'Create Team Error');
        if (e && e.status && e.statusCode) {
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
    updateTeam: async (root, arg, {req}, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          helpers.authorization._isAuthenticated,
          helpers.team._validateUpdateParams,
          helpers.team._updateTeam
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully updated a team',
          id: req.$scope.team && req.$scope.team._id
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
    softRemoveTeam: async (root, arg, {req}, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          helpers.authorization._isAuthenticated,
          helpers.team._softRemoveTeam
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully updated a team',
          id: req.$scope.team && req.$scope.team._id
        };
      } catch (e) {
        req.log.error(e, 'Delete Team Error');
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
