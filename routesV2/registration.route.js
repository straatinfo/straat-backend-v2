const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Registration = require('../api/registration');
const RegistrationRoute = express.Router();
const RegistrationValidator = require('../validator/registration.validator');
const CloudinaryService = require('../service/cloudinary.service');

// RegistrationRoute.route('/')
// .post(RegistrationValidator.accessCodeRequestFormValidator, Registration.requestForCode);

// RegistrationRoute.route('/signup')
// .post(RegistrationValidator.registerWithCodeFormValidator, Registration.registerWithCode);

// RegistrationRoute.route('/signupV2')
// .post(
//   CloudinaryService.singleUpload('team-logo', 'team'),
//   RegistrationValidator.registerWithCodeFormValidatorV2,
//   Registration.registerWithCodeV2
// );

// RegistrationRoute.route('/signupV3')
// .post(
//   RegistrationValidator.registerWithCodeFormValidatorV2,
//   Registration.registerWithCodeV3
// );

RegistrationRoute.route('/v3/api/validation/input')
.post(Registration.checkUserInput);

RegistrationRoute.route('/v3/api/validation/host')
.post(Registration.checkHostWithCode);

module.exports = RegistrationRoute;
 