const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const AdminMiddleware = require('../middlewares/admin.middleware');
const ReportType = require('../api/reportType');
const ReportTypeRoute = express.Router();

ReportTypeRoute.route('/')
.get(requireAuth, ReportType.getReportTypes) // get the list of report Type for the reporter to choose.
.post(requireAuth, AdminMiddleware.checkIfAdmin, ReportType.createdReportType); // the admin can add report type.

ReportTypeRoute.route('/:id')
.put(requireAuth, AdminMiddleware.checkIfAdmin, ReportType.updateReportType) // Admin can edit the report type.
.delete(requireAuth, AdminMiddleware.checkIfAdmin, ReportType.deleteReportType); // Admin can delete report Type

module.exports = ReportTypeRoute;
