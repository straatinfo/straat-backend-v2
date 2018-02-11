const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Upload = require('../api/upload');
const UploadRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');

UploadRoute.route('/public')
.post(
  CloudinaryService.singleUpload('photo'),
  /* requireAuth, */
  Upload.uploadPhoto
);

module.exports = UploadRoute;
