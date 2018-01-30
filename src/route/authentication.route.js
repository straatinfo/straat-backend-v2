const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.service');
const requireSignin = passport.authenticate('local', { session: false });
const Authentication = require('../api/authentication');
const AuthRoute = express.Router();

AuthRoute.route('/userChecker/:input')
.get(Authentication.checkUserInput);

AuthRoute.route('/login')
.post(requireSignin, Authentication.login);

AuthRoute.route('/register')
.post(Authentication.register);

module.exports = AuthRoute;
