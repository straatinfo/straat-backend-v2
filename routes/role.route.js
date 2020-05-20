const express = require('express');
const passport = require('passport');
require('../utils/passport');
const requireSignin = passport.authenticate('local', { session: false });
const handlers = require('../handlers');

const hostRoute = express.Router();

hostRoute.route('/v4/api/roles')
  .get(
    handlers.role.getRoles.buildQuery,
    handlers.role.getRoles.respond
  );

hostRoute.route('/v4/api/roles/:roleId')
  .get(
    handlers.role.getRole
  );

module.exports = hostRoute;
