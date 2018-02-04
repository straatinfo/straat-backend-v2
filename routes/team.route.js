const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Team = require('../api/team');
const TeamRoute = express.Router();


TeamRoute.route('/')
.get(requireAuth, Team.getTeams);

TeamRoute.route('/new/:userId')
.post(requireAuth, Team.createTeam);

TeamRoute.route('/:teamId')
.get(requireAuth, Team.getTeamById)
.put(requireAuth, Team.updateTeam)
.delete(requireAuth, Team.deleteTeam);

TeamRoute.route('/leader/:userId/:teamId')
.get(requireAuth, Team.addLeader)
.delete(requireAuth, Team.removeLeader);

TeamRoute.route('/member/:userId/:teamId')
.get(requireAuth, Team.addMember)
.delete(requireAuth, Team.kickMember);


module.exports = TeamRoute;
