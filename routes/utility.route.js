const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });

const UtilityRoute = express.Router();
const utilityHandler = require('../handlers/utility');
const handlers = require('../handlers');

UtilityRoute.route('/api/v1/utility/postcode')
.get(
  /* requireAuth, */
  utilityHandler.getPostCode,
  handlers.authentication.registration.getHostRole,
  handlers.host.getHost.appendHostToAddress
);

module.exports = UtilityRoute;
