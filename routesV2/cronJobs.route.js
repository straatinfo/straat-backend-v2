const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', { session: false });
const handlers = require('../handlers');

const CronRoute = express.Router();

CronRoute.route('/v3/api/cronJobs/reports')
  .put(
    // requireAuth,
    handlers.authentication.checkAuthorizedDomain,
    handlers.cronJobs.expireReports.createQuery,
    handlers.cronJobs.expireReports.logic
  )
  .delete(
    handlers.authentication.checkAuthorizedDomain,
    handlers.cronJobs.purgeReports.createQuery,
    handlers.cronJobs.purgeReports.getReportIds,
    handlers.cronJobs.purgeReports.getAllConversationIds,
    handlers.cronJobs.purgeReports.getMessagesIds,
    // handlers.cronJobs.purgeReports.deleteAllMessages,
    // handlers.cronJobs.purgeReports.deleteAllConversation,
    // handlers.cronJobs.purgeReports.deleteAllHostReportsAndReporterReports,
    handlers.cronJobs.purgeReports.logic
  );

module.exports = CronRoute;

