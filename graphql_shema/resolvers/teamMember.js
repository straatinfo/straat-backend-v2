const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const pWaterfall = require('p-waterfall');
const { Team, TeamMember, User } = require('../../models');
const { teamMembership } = require('../helpers');

module.exports = {
  Query: {
    teamMembers: (root, arg, context, info) => {
      const query = {};
      if (arg.softRemoved != null) {
        query.softRemoved = arg.softRemoved;
      }
      if (arg.userId) {
        query._user = arg.userId;
      }  

      if (arg.teamId) {
        query._team = arg.teamId
      }

      return TeamMember.find(query);
    },
    teamMember: (root, {id}, context, info) => {
      const query = {};
      let hasQ = false;
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) { 
          hasQ = true
          query._id = id;
        }
      }

      if (hasQ) {
        return TeamMember.findOne(query);
      } else {
        return null;
      }

    }
  },
  TeamMember: {
    user: (teamMember, arg, context, info) =>  User.findById(teamMember._user),
    team: (teamMember, arg, context, info) => Team.findById(teamMember._team),
  },
  Mutation: {
    setActiveTeam: async (teamMember, arg, {req}, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          teamMembership._validateParams,
          teamMembership._setActiveTeam
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully set active team',
          id: req.$scope.membership && req.$scope.membership._id
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
    unJoinTeam: async (teamMember, arg, {req}, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          teamMembership._validateParams,
          teamMembership._unJoinTeam
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully un joined team',
          id: req.$scope.membership && req.$scope.membership._id
        };
      } catch (e) {
        req.log.error(e, 'Un joined team Error');
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
    joinTeam: async (teamMember, arg, {req}, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          teamMembership._validateVolunteerCompat,
          teamMembership._joinTeam
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully Joined Team',
          id: req.$scope.membership && req.$scope.membership._id
        };
      } catch (e) {
        req.log.error(e, 'Join Team Error');
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
    setAsMember: async (teamMember, arg, {req}, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          teamMembership._validateParams,
          teamMembership._validateLeadership,
          teamMembership._setAsMember
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully set as Member',
          id: req.$scope.membership && req.$scope.membership._id
        };
      } catch (e) {
        req.log.error(e, 'Set as Member Error');
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
    setAsLeader: async (teamMember, arg, {req}, info) => {
      req.body = arg;
      try {
        req = await pWaterfall([
          teamMembership._validateParams,
          teamMembership._validateLeadership,
          teamMembership._setAsLeader
        ], req);
        return {
          status: 'SUCCESS',
          statusCode: 0,
          httpCode: 200,
          message: 'Successfully set as Leader',
          id: req.$scope.membership && req.$scope.membership._id
        };
      } catch (e) {
        req.log.error(e, 'Set as Leader Error');
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
