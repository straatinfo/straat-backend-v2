const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', { session: false });
const handlers = require('../handlers');

const MessageRoute = express.Router();

MessageRoute.route('/v3/api/message/unread/:conversationId/:userId')
  .get(
    // requireAuth,
    handlers.message.unread.validateParams,
    handlers.message.unread.getUnreadMessage
  )
  .delete(
    // requireAuth,
    handlers.message.unread.validateParams,
    handlers.message.unread.deleteUnreadMessage
  );

MessageRoute.route('/v3/api/message/unread/report/count/:userId')
    .get(
      // requireAuth,
      handlers.message.unread.getUnreadMessageCountGroupByReportType
    )

module.exports = MessageRoute;
