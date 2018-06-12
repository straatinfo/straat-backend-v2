const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });
const User = require('../api/user');
const UserRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');
const UserValidation = require('../validator/user.validator');

UserRoute.route('/profile/:id')
.get(/* requireAuth, */ User.getUserDetails)
.put(/* requireAuth, */ User.updateUserDetails); 

UserRoute.route('/pic/:id')
.put(
  CloudinaryService.singleUpload('profile-pic', 'user'),
  UserValidation.addProifleFormValidator,
  /* requireAuth, */
  User.addProfilePic
);

UserRoute.route('/password')
.post(User.forgotPassword)
.put(requireSignin, User.changePassword);

UserRoute.route('/fcm')
.put(User.updateFcmToken)

module.exports = UserRoute;
