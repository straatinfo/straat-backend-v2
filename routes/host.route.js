const express = require('express');
const passport = require('passport');
require('../utils/passport');
const requireSignin = passport.authenticate('local', { session: false });
const handlers = require('../handlers');

const hostRoute = express.Router();

hostRoute.route('/v4/api/hosts')
  .get(
    handlers.host.getHosts.buildQuery,
    handlers.host.getHosts.respond
  );

hostRoute.route('/v4/api/hosts/:hostId')
  .get(
    handlers.host.gethost
  );

module.exports = hostRoute;
