const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Team = require('../api/teamV2');
const TeamRoute = express.Router();
const ExpressJoi = require('express-joi-validator');
const TeamValidation = require('../validation/team.validation');

TeamRoute.route('/')
.put(ExpressJoi(TeamValidation.putSchema), Team.updateTeam)
.post(ExpressJoi(TeamValidation.postSchema), Team.createTeam);

module.exports = TeamRoute;
