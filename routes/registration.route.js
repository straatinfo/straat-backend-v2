const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Registration = require('../api/registration');
const RegistrationRoute = express.Router();
const RegistrationValidator = require('../validator/registration.validator');
const CloudinaryService = require('../service/cloudinary.service');

RegistrationRoute.route('/')
.post(RegistrationValidator.accessCodeRequestFormValidator, Registration.requestForCode);

RegistrationRoute.route('/signup')
.post(RegistrationValidator.registerWithCodeFormValidator, Registration.registerWithCode);

RegistrationRoute.route('/signupV2')
.post(
  CloudinaryService.singleUpload('team-logo'),
  RegistrationValidator.registerWithCodeFormValidatorV2,
  Registration.registerWithCodeV2
);

RegistrationRoute.route('/validation')
.post(Registration.checkUserInput);

module.exports = RegistrationRoute;
