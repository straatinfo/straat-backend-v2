const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Team = require('../api/team');
const TeamRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');
const TeamValidator = require('../validator/team.validator');

TeamRoute.route('/')
.get(/*requireAuth,*/ Team.getTeams)
.post(/*requireAuth,*/ Team.getTeamWithFilter);

TeamRoute.route('/new/:userId')
.post(CloudinaryService.singleUpload('team-logo'),TeamValidator.createTeamFormValidator, /*requireAuth,*/ Team.createTeam);

TeamRoute.route('/:teamId')
.get(/*requireAuth,*/ Team.getTeamById)
.put(/*requireAuth,*/ Team.updateTeam)
.delete(/*requireAuth,*/Team.deleteTeam);

TeamRoute.route('/leader/:userId/:teamId')
.get(/*requireAuth,*/ Team.addLeader)
.delete(/*requireAuth,*/ Team.removeLeader);

TeamRoute.route('/member/:userId/:teamId')
.get(/*requireAuth,*/ Team.addMember)
.delete(/*requireAuth,*/ Team.kickMember);

TeamRoute.route('/approve')
.get(/*requireAuth,*/ Team.getApprovedTeam) // /approve?isApproved=false returns nonApproved teams
.post(/*requireAuth,*/ Team.approveTeam) // /approves a team 
.put(/*requireAuth,*/ Team.disApproveTeam); // /change the isApproved to false



module.exports = TeamRoute;
