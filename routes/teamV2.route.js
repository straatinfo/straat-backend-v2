const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Team = require('../api/teamV2');
const TeamRoute = express.Router();
const ExpressJoi = require('express-joi-validator');
const TeamValidation = require('../validation/team.validation');
const CloudinaryService = require('../service/cloudinary.service');
const multer = require('multer');
const upload = multer();

TeamRoute.route('/')
.put(ExpressJoi(TeamValidation.putSchema), Team.updateTeam)
.post(
  (req, res, next) => {
    console.log(req.body);
    if (req.query.photo == 'true') {
      return CloudinaryService.singleUpload('photo', 'teams',['jpg', 'png', 'jpeg']);
    } else {
      next();
    }
  },
  ExpressJoi(TeamValidation.postSchema), Team.createTeam)
.delete(ExpressJoi(TeamValidation.deleteSchema), Team.deleteTeam);

module.exports = TeamRoute;