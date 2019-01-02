const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireSignin = passport.authenticate('local', { session: false });
const Authentication = require('../api/authentication');
const AuthRoute = express.Router();
const UserValidator = require('../validator/user.validator');

AuthRoute.route('/login')
.post(requireSignin, Authentication.login);

AuthRoute.route('/register')
.post(UserValidator.registrationFormValidator, Authentication.register);

module.exports = AuthRoute;
