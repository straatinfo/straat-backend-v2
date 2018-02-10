const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const TeamInvite = require('../api/teamInvite');
const TeamInviteRoute = express.Router();


TeamInviteRoute.route('/teamInvites/:teamId')
.get(/*requireSignin,*/ TeamInvite.getTeamPendingInvites);

TeamInviteRoute.route('/teamRequests/:teamId')
.get(/*requireSignin,*/ TeamInvite.getTeamPendingRequests);

TeamInviteRoute.route('/userInvites/:userId')
.get(/*requireSignin,*/ TeamInvite.getUserPendingInvites);

TeamInviteRoute.route('/userRequests/:userId')
.get(/*requireSignin,*/ TeamInvite.getUserPendingRequest);

TeamInviteRoute.route('/sendInvite/:userId/:teamId')
.get(/*requireSignin,*/ TeamInvite.sendInvite);

TeamInviteRoute.route('/sendRequest/:userId/:teamId')
.get(/*requireSignin,*/ TeamInvite.sendRequest);

TeamInviteRoute.route('/declineRequest/:userId/:teamId')
.get(/*requireSignin,*/ TeamInvite.declineRequest);

TeamInviteRoute.route('/declineInvite/:userId/:teamId')
.get(/*requireSignin,*/ TeamInvite.declineInvite);

TeamInviteRoute.route('/acceptRequest/:userId/:teamId')
.get(/*requireSignin,*/ TeamInvite.acceptRequest);

TeamInviteRoute.route('/acceptInvite/:userId/:teamId')
.get(/*requireSignin,*/ TeamInvite.acceptInvite);

module.exports = TeamInviteRoute;
