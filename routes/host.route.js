const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Host = require('../api/host');
const HostRoute = express.Router();
const FlatHost = require('../middleware/flatHost');

HostRoute.route('/freehost')
.get(/* requireAuth, */ Host.getFreeHost);

HostRoute.route('/')
.get(/*requireAuth,*/ Host.getHosts, FlatHost.getFlatHosts)
.post(/*requireAuth,*/ Host.createHost);

HostRoute.route('/:id')
.get(/*requireAuth,*/ Host.getHostById)
.put(/*requireAuth,*/ Host.updateHost)
.delete(/*requireAuth,*/ Host.deleteHost);

HostRoute.route('/withinRadius/:long/:lat/:radius')
.get(/*requireAuth,*/ Host.getHostsWithinRadius, FlatHost.getFlatHosts);

HostRoute.route('/bulk')
.post(/*requireAuth,*/ Host.bulkCreateHost);

module.exports = HostRoute;
