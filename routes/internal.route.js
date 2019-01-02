const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Upload = require('../api/upload');
const InternalRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');
const bcrypt = require('bcrypt-nodejs');

const InternalAPI = require('../api/internal');

InternalRoute.route('/backup-db')
.get(
  InternalAPI.checkToken,
  InternalAPI.backupDB,
  InternalAPI.uploadDBDump,
  InternalAPI.sendEmail,
  InternalAPI.respond);

module.exports = InternalRoute;
