const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireSignin = passport.authenticate('local', { session: false });
const Authentication = require('../api/authentication');
const AuthRoute = express.Router();
const UserValidator = require('../validator/user.validator');
const authHandlers = require('../handlers/authentication');
const requireAuth = passport.authenticate('jwt', {session: false});

AuthRoute.route('/v3/api/auth/login')
.post(requireSignin, Authentication.login);

AuthRoute.route('/v3/api/auth/register')
.post(
  authHandlers.registration.validateUserParams,
  authHandlers.registration.validateEmail,
  authHandlers.registration.checkHost,
  authHandlers.registration.checkTeam,
  authHandlers.registration.getUserRole,
  authHandlers.registration.register,
  authHandlers.registration.appendToHost,
  authHandlers.registration.joinTeam,
  authHandlers.registration.createTeam,
  authHandlers.registration.sendTeamRequest,
  authHandlers.registration.respond
);

AuthRoute.route('/v3/api/auth/refresh')
  .post(
    requireAuth,
    authHandlers.refresh.validateUserParams,
    authHandlers.refresh.checkEmail,
    authHandlers.refresh.refreshUserData
  );

AuthRoute.route('/v3/api/auth/firebase')
  .post(
    requireAuth,
    authHandlers.refresh.validateUserParams,
    authHandlers.addUpdateFirebaseToken.validateBody,
    authHandlers.addUpdateFirebaseToken.validateReporter,
    authHandlers.addUpdateFirebaseToken.logic
  );

module.exports = AuthRoute;
