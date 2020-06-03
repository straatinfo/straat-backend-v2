const express = require('express');
const passport = require('passport');
require('../utils/passport');
const requireSignin = passport.authenticate('local', { session: false });
const handlers = require('../handlers');

const authenticationRoute = express.Router();

authenticationRoute.route('/v4/api/authentication/signup')
  .post(
    handlers.authentication.signup.validateUserParams,
    handlers.authentication.signup.validateEmail,
    handlers.authentication.signup.checkHost,
    handlers.authentication.signup.checkTeam,
    handlers.authentication.signup.getUserRole,
    handlers.authentication.signup.createUser,
    handlers.authentication.signup.joinTeam,
    handlers.authentication.signup.createTeam,
    handlers.authentication.signup.commitTransaction,
    handlers.authentication.signup.sendTeamRequest,
    handlers.authentication.signup.getUserData,
    handlers.authentication.signup.getTeamData,
    handlers.authentication.signup.sendNotification,
    handlers.authentication.signup.respond
  );

authenticationRoute.route('/v4/api/authentication/validateInput')
  .post(
    handlers.utility.validateRegistrationInput
  );

authenticationRoute.route('/v4/api/authentication/signin')
  .post(
    requireSignin,
    handlers.authentication.signin
  );
module.exports = authenticationRoute;
