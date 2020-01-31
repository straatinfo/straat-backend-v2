const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });

const UtilityRoute = express.Router();
const utilityHandler = require('../handlers/utility');
const handlers = require('../handlers');


UtilityRoute.route('/v3/api/utility/postcode')
.get(
  /* requireAuth, */
  utilityHandler.getPostCode,
  handlers.authentication.registration.getHostRole,
  handlers.host.getHost.appendHostToAddress
);

UtilityRoute.route('/v3/api/utility/feedback')
  .post(
    requireAuth,
    handlers.utility.feedback.validateParams,
    handlers.utility.feedback.saveFeedback,
    handlers.utility.feedback.sendFeedbackNotification
  );

module.exports = UtilityRoute;
