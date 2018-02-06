const express = require('express');
const passport = require('passport');
const passportService = require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Reporter = require('../api/reporter');
const ReporterRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');
const ReporterFormValidator = require('../validator/reporter.validator');

ReportRoute.route('/')
.get(requireAuth, Report.getReports)
.post(
  requireAuth,
  CloudinaryService.multipleUpload('report-images', 9),
  ReportFormValidator.reportFormValidator,
  CloudinaryService.getMetaData, Report.createReport
);

ReportRoute.route('/:id')
.get(requireAuth, Report.getReportById)
.put(requireAuth, Report.updateReport)
.delete(requireAuth, Report.deleteReport);


ReportRoute.route('/category/:reportTypeId')
.get(requireAuth, Report.getReportsByReportType);

ReportRoute.route('/host/:hostId')
.get(requireAuth, Report.getReportsByHostId);

module.exports = ReportRoute;
