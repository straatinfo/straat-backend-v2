const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Host = require('../api/host');
const HostRoute = express.Router();

HostRoute.route('/')
.get(requireAuth, Host.getHosts);

HostRoute.route('/:id')
.get(requireAuth, Host.getHostById)
.put(requireAuth, Host.updateHost)
.delete(requireAuth, Host.deleteHost);

HostRoute.route('/page/:pageNumber/:itemPerPage')
.get(requireAuth, Host.getHostByPage);

HostRoute.route('/withinRadius/:long/:lat/:radius')
.get(requireAuth, Host.getHostWithinRadius); //get the list of nearby host


module.exports = HostRoute;
