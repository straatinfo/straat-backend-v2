const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Registration = require('../api/registration');
const RegistrationRoute = express.Router();
const RegistrationValidator = require('../validator/registration.validator');

RegistrationRoute.route('/')
.post(RegistrationValidator.accessCodeRequestFormValidator, Registration.requestForCode);

RegistrationRoute.route('/signup')
.post(RegistrationValidator.registerWithCodeFormValidator, Registration.registerWithCode);

module.exports = RegistrationRoute;
