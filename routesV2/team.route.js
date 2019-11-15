const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', { session: false });
const handlers = require('../handlers');

const TeamRoute = express.Router();

TeamRoute.route('/v3/api/teams/requestCount/:userId')
  .get(
    // requireAuth,
    handlers.team.teamRequestCount.checkTeamLeader,
    handlers.team.teamRequestCount.checkTeamRequestCount,
    handlers.team.teamRequestCount.response
  );

TeamRoute.route('/v3/api/teams/chat/:teamId/:userId')
    .get(
      handlers.team.teamMateChats.getTeam,
      handlers.team.teamMateChats.populateConversation,
      handlers.team.teamMateChats.getTeamConvoPreview,
      handlers.team.teamMateChats.populateUnreadChat,
      handlers.team.teamMateChats.getLatestChat,
      handlers.team.teamMateChats.respond
    );

module.exports = TeamRoute;
 