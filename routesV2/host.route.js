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
    handlers.host.getHost.getHostByCoordinates,
    handlers.host.getHost.response,
    handlers.host.getHost.catchMiddlewareError
  );

HostRoute.route('/v3/api/hosts/searchByPostcode')
  .get(
    // requireAuth,
    function (req,res,next) {
      console.log('\n\n\n\n/v3/api/hosts/searchByPostcode\n\n\n\n')
      next();
    },
    handlers.authentication.registration.getHostRole,
    handlers.utility.getFullAddress,
    handlers.host.getHost.getHostUsingAddress,
    handlers.host.getHost.response,
    handlers.host.getHost.catchMiddlewareError
  );

module.exports = HostRoute;
