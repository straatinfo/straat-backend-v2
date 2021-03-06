const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const TeamInvite = require('../api/teamInvite');
const TeamInviteRoute = express.Router();
const authentication = require('../handlers/authentication');


TeamInviteRoute.route('/teamInvites/:teamId')
.get(/*requireSignin,*/ TeamInvite.getTeamPendingInvites);

TeamInviteRoute.route('/teamRequests/:teamId')
.get(/*requireAuth,*/ TeamInvite.getTeamPendingRequests);

TeamInviteRoute.route('/userInvites/:userId')
.get(/*requireAuth,*/ TeamInvite.getUserPendingInvites);

TeamInviteRoute.route('/userRequests/:userId')
.get(/*requireAuth,*/ TeamInvite.getUserPendingRequest);

TeamInviteRoute.route('/sendInvite/:userId/:teamId')
.get(/*requireAuth,*/ TeamInvite.sendInvite);

TeamInviteRoute.route('/sendRequest/:userId/:teamId')
.get(/*requireAuth,*/ TeamInvite.sendRequest);

TeamInviteRoute.route('/declineRequest/:userId/:teamId')
.get(
  requireAuth,
  authentication.deleteUser,
  TeamInvite.declineRequest
);

TeamInviteRoute.route('/declineInvite/:userId/:teamId')
.get(/*requireAuth,*/ TeamInvite.declineInvite);

TeamInviteRoute.route('/acceptRequest/:userId/:teamId')
.get(/*requireAuth,*/ TeamInvite.acceptRequest);

TeamInviteRoute.route('/acceptInvite/:userId/:teamId')
.get(/*requireAuth,*/ TeamInvite.acceptInvite);

TeamInviteRoute.route('/byReporterAndTeam/:teamId/:userId')
.get(/*requireAuth,*/ TeamInvite.checkInviteExist);

module.exports = TeamInviteRoute;
