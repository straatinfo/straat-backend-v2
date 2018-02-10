const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Host = require('../api/host');
const HostRoute = express.Router();

HostRoute.route('/')
.get(/*requireSignin,*/ Host.getHosts)
.post(/*requireSignin,*/ Host.createHost);

HostRoute.route('/:id')
.get(/*requireSignin,*/ Host.getHostById)
.put(/*requireSignin,*/ Host.updateHost)
.delete(/*requireSignin,*/ Host.deleteHost);

HostRoute.route('/withinRadius/:long/:lat/:radius')
.get(/*requireSignin,*/ Host.getHostsWithinRadius);

HostRoute.route('/bulk')
.post(/*requireSignin,*/ Host.bulkCreateHost);

module.exports = HostRoute;
