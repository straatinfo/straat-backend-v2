const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const User = require('../api/user');
const UserRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');

UserRoute.route('/:id')
.get(/* requireAuth, */ User.getUserDetails)
.put(/* requireAuth, */ User.updateUserDetails);

UserRoute.route('/pic/:id')
.put(
  CloudinaryService.singleUpload('profile-pic'),
  /* requireAuth, */
  User.addProfilePic
);

UserRoute.route('/password/:id')
.get(User.forgotPassword)
.put(User.changePassword);

module.exports = UserRoute;
