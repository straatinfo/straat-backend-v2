const express = require('express');
const passport = require('passport');
const passportService = require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Report = require('../api/report');
const ReportRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');
const ReportFormValidator = require('../validator/report.validator');

ReportRoute.route('/')
.get(/*requireAuth,*/ Report.getReports)
.post(
  /*requireAuth,*/
  CloudinaryService.multipleUpload('report-images', 9),
  ReportFormValidator.reportFormValidator,
  CloudinaryService.getMetaData,
  Report.createReport
);

ReportRoute.route('/:id')
.get(/*requireAuth,*/ Report.getReportById)
.put(/*requireAuth,*/ Report.updateReport)
.delete(/*requireAuth,*/ Report.deleteReport);


ReportRoute.route('/category/:reportTypeId')
.get(/*requireAuth,*/ Report.getReportsByReportType);

ReportRoute.route('/host/:hostId')
.get(/*requireAuth,*/ Report.getReportsByHostId);

ReportRoute.route('/reporter/:reporterId')
.get(/* requireAuth, */ Report.getReportByReporter);

ReportRoute.route('/nearby/:long/:lat/:radius')
.get(/* requireAuth, */ Report.getReportNearBy);

module.exports = ReportRoute;
