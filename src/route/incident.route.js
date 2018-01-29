const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Report = require('../api/report');
const ReportRoute = express.Router();

ReportRoute.route('/')
.get(requireAuth, Report.getLatestReport) // will get the latest 100 reports
.post(requireAuth, Report.reportReport);

ReportRoute.route('/:id')
.get(requireAuth, Report.getReportById)
.put(requireAuth, Report.updateReport)
.delete(requireAuth, Report.deleteReport);

ReportRoute.route('/page/:pageNumber/:itemPerPage')
.get(requireAuth, Report.getReportByPage);

ReportRoute.route('/category/:reportTypeId')
.get(requireAuth, Report.getReportByReportType);

ReportRoute.route('/category/:reportTypeId/page/:pageNumber/:itemPerPage')
.get(requireAuth, Report.getReportByReportTypeByPage);

module.exports = ReportRoute;
