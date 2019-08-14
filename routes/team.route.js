const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Team = require('../api/team');
const TeamRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');
const TeamValidator = require('../validator/team.validator');
const TeamMiddleware = require('../middleware/team.middleware');

const handlers = require('../handlers');

TeamRoute.route('/')
.get(/*requireAuth,*/ Team.getTeams)
.post(/*requireAuth,*/ Team.getTeamWithFilter);

TeamRoute.route('/new/:userId')
.post(CloudinaryService.singleUpload('team-logo', 'team'),TeamValidator.createTeamFormValidator, /*requireAuth,*/ Team.createTeam);

TeamRoute.route('/leader/:userId/:teamId')
.get(/*requireAuth,*/ Team.addLeader)
.delete(/*requireAuth,*/ Team.removeLeader);

TeamRoute.route('/member/:userId/:teamId')
.get(/*requireAuth,*/ Team.addMember)
.delete(/*requireAuth,*/ Team.kickMember);

TeamRoute.route('/approve')
.get(/*requireAuth,*/ Team.getApprovedTeam, TeamMiddleware.flatTeam) // /approve?isApproved=false returns nonApproved teams
.post(/*requireAuth,*/ Team.approveTeam) // /approves a team 
.put(/*requireAuth,*/ Team.disApproveTeam); // /change the isApproved to false

TeamRoute.route('/:teamId')
.get(/*requireAuth,*/ Team.getTeamById)
.put(
  /*requireAuth,*/
  CloudinaryService.singleUpload('team-logo', 'team'),
  TeamValidator.updateTeamFormValidator,
  Team.updateTeam
)
.delete(/*requireAuth,*/ Team.softRemoveTeam)

TeamRoute.route('/info/:teamId')
.get(/*requireAuth,*/ Team.getTeamInfoById)

TeamRoute.route('/list/:_user')
.get(
  /*requireAuth,*/
  Team.getTeamListByUserId,
  handlers.report.getUnreadMessage.populateUnreadMessageForTeams,
  Team.respondToGetTeamListByUserId
);

TeamRoute.route('/nonvol/:_host')
.get(/*requireAuth,*/ Team.getNonVolTeamListByHost);


module.exports = TeamRoute;
