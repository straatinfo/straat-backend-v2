const express = require('express');
const passport = require('passport');
const passportService = require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Report = require('../api/report');
const ReportRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');
const ReportFormValidator = require('../validator/report.validator');

ReportRoute.route('/')
.get(/*requireSignin,*/ Report.getReports)
.post(
  /*requireSignin,*/
  CloudinaryService.multipleUpload('report-images', 9),
  ReportFormValidator.reportFormValidator,
  CloudinaryService.getMetaData, Report.createReport
);

ReportRoute.route('/:id')
.get(/*requireSignin,*/ Report.getReportById)
.put(/*requireSignin,*/ Report.updateReport)
.delete(/*requireSignin,*/ Report.deleteReport);


ReportRoute.route('/category/:reportTypeId')
.get(/*requireSignin,*/ Report.getReportsByReportType);

ReportRoute.route('/host/:hostId')
.get(/*requireSignin,*/ Report.getReportsByHostId);

module.exports = ReportRoute;
