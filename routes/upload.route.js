const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Upload = require('../api/upload');
const UploadRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');

UploadRoute.route('/public')
.post(
  CloudinaryService.singleUpload('photo', 'reports', ['jpg', 'png', 'jpeg', 'mp4']),
  /* requireAuth, */
  Upload.uploadPhoto
);

UploadRoute.route('/photo')
.post(
  CloudinaryService.singleUpload('photo', 'reports', ['jpg', 'png', 'jpeg', 'mp4']),
  /* requireAuth, */
  Upload.uploadPhotoAndSave
);

UploadRoute.route('/profile')
.post(
  CloudinaryService.singleUpload('photo', 'profile', ['jpg', 'png', 'jpeg']),
  /* requireAuth, */
  Upload.uploadPhotoAndSave
);

module.exports = UploadRoute;
