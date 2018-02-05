const express = require('express');
const passport = require('passport');
const passportService = require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Report = require('../api/report');
const ReportRoute = express.Router();

ReportRoute.route('/')
.get(requireAuth, Report.getReports)
.post(requireAuth, Report.getReports)

ReportRoute.route('/:id')
.get(requireAuth, Report.getReportById)
.put(requireAuth, Report.updateReport)
.delete(requireAuth, Report.deleteReport);


ReportRoute.route('/category/:reportTypeId')
.get(requireAuth, Report.getReportsByReportType);

ReportRoute.route('/host/:hostId')
.get(requireAuth, Report.getReportsByHostId);

module.exports = ReportRoute;
