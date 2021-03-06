const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Reporter = require('../api/reporter');
const ReporterRoute = express.Router();
const FlatReporter = require('../middleware/flatReporter');

ReporterRoute.route('/')
.get(/*requireAuth,*/ Reporter.getReporters, FlatReporter.getFlatReporters);

ReporterRoute.route('/:id')
.get(/*requireAuth,*/ Reporter.getReporterById)
.delete(/*requireAuth,*/ Reporter.deleteReporter);

ReporterRoute.route('/host/:hostId')
.get(/*requireAuth,*/ Reporter.getReportersByHost, FlatReporter.getFlatReporters);

ReporterRoute.route('/block/:id')
.put(/*requireAuth,*/ Reporter.blockReporter);

ReporterRoute.route('/unblock/:id')
.put(/*requireAuth,*/ Reporter.unBlockReporter);

module.exports = ReporterRoute;
