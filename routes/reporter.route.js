const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Reporter = require('../api/reporter');
const ReporterRoute = express.Router();

ReporterRoute.route('/')
.get(/*requireSignin,*/ Reporter.getReporters);

ReporterRoute.route('/:id')
.get(/*requireSignin,*/ Reporter.getReporterById);

ReporterRoute.route('/host/:hostId')
.get(/*requireSignin,*/ Reporter.getReportersByHost);

ReporterRoute.route('/block/:id')
.put(/*requireSignin,*/ Reporter.blockReporter);

ReporterRoute.route('/unblock/:id')
.put(/*requireSignin,*/ Reporter.unBlockReporter);

module.exports = ReporterRoute;
