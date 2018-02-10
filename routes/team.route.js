const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Team = require('../api/team');
const TeamRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');
const TeamValidator = require('../validator/team.validator');

TeamRoute.route('/')
.get(/*requireSignin,*/ Team.getTeams);

TeamRoute.route('/new/:userId')
.post(CloudinaryService.singleUpload('team-logo'),TeamValidator.createTeamFormValidator, /*requireSignin,*/ Team.createTeam);

TeamRoute.route('/:teamId')
.get(/*requireSignin,*/ Team.getTeamById)
.put(/*requireSignin,*/ Team.updateTeam)
.delete(/*requireSignin,*/ Team.deleteTeam);

TeamRoute.route('/leader/:userId/:teamId')
.get(/*requireSignin,*/ Team.addLeader)
.delete(/*requireSignin,*/ Team.removeLeader);

TeamRoute.route('/member/:userId/:teamId')
.get(/*requireSignin,*/ Team.addMember)
.delete(/*requireSignin,*/ Team.kickMember);


module.exports = TeamRoute;
