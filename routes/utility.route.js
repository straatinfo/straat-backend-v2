const express = require('express');
const passport = require('passport');
require('../utils/passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });

const UtilityRoute = express.Router();
const utilityHandler = require('../handlers/utility');
const handlers = require('../handlers');

UtilityRoute.route('/v4/api/utility/postcode')
.get(
  /* requireAuth, */
  utilityHandler.getPostCode,
  handlers.role.getHostRole,
  handlers.host.appendHostToAddress
);

module.exports = UtilityRoute;
