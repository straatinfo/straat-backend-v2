const express = require('express');
const passport = require('passport');
require('../utils/passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });

const UtilityRoute = express.Router();
const utilityHandler = require('../handlers/utility');
const handlers = require('../handlers');
const cloudinary = require('../lib/cloudinary');

UtilityRoute.route('/v4/api/utility/postcode')
.get(
  /* requireAuth, */
  utilityHandler.getPostCode,
  handlers.role.getHostRole,
  handlers.host.appendHostToAddress
);

UtilityRoute.route('/v4/api/utility/single_file_upload')
  .post(
    /* requireAuth, */
    function (req, res, next) {
      const folderName = req.query.folderName || 'reports';
      return cloudinary.singleUpload('media', folderName, ['jpg', 'png', 'jpeg', 'mp4'])(req, res, next);
    },
    handlers.utility.media.save
  );

UtilityRoute.route('/v4/api/utility/feedback')
  .post(
    requireAuth,
    handlers.utility.feedback.validateParams,
    handlers.utility.feedback.saveFeedback,
    handlers.utility.feedback.sendFeedbackNotification
  );


module.exports = UtilityRoute;
