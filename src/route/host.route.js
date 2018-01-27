const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Host = require('../api/host');
const HostRoute = express.Router();

HostRoute.route('/withinRadius/:long/:lat/:radius')
.get(requireAuth); //get the list of nearest host


module.exports = HostRoute;
