const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', { session: false });
const handlers = require('../handlers');

const HostRoute = express.Router();

HostRoute.route('/v3/api/hosts/search')
  .get(
    // requireAuth,
    handlers.authentication.registration.getHostRole,
    handlers.host.getHost.getHostByName,
    handlers.host.getHost.response,
    handlers.utility.getFullAddress,
    handlers.host.getHost.getHostByCoordinates,
    handlers.host.getHost.response,
    handlers.host.getHost.catchMiddlewareError
  );