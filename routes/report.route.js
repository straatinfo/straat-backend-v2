const express = require('express');
const passport = require('passport');
const passportService = require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Report = require('../api/report');
const ReportRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');
const ReportFormValidator = require('../validator/report.validator');
const FlatReport = require('../middleware/flatReport');
const ReportMiddleware = require('../middleware/report.middleware');

ReportRoute.route('/')
.get(/*requireAuth,*/ Report.getReports, FlatReport.getFlatReports)
.post(
  /*requireAuth,*/
  CloudinaryService.multipleUpload('report-images', 9, 'reports', ['png', 'jpeg', 'jpg', 'mp4']),
  ReportFormValidator.reportFormValidator,
  CloudinaryService.getMetaData,
  Report.createReport
);

ReportRoute.route('/V2')
.post(
  /* requireAuth, */
  ReportFormValidator.reportFormValidator,
  Report.createReportV2,
  ReportMiddleware.createReportTypeC
);

ReportRoute.route('/:id')
.get(/*requireAuth,*/ Report.getReportById)
.put(/*requireAuth,*/ Report.updateReport)
.delete(/*requireAuth,*/ Report.deleteReport);


ReportRoute.route('/reportType/:reportTypeId')
.get(/*requireAuth,*/ Report.getReportsByReportType, FlatReport.getFlatReports);

ReportRoute.route('/host/:hostId')
.get(/*requireAuth,*/ Report.getReportsByHostId, FlatReport.getFlatReports);

ReportRoute.route('/reporter/:reporterId')
.get(/* requireAuth, */ Report.getReportByReporter, FlatReport.getFlatReports);

ReportRoute.route('/nearby/:long/:lat/:radius')
.get(/* requireAuth, */ Report.getReportNearBy, FlatReport.getFlatReports);

ReportRoute.route('/status/:reportId')
.put(/* requireAuth, */ReportFormValidator.changeReportStatusFormValidator, Report.changeReportStatus);

ReportRoute.route('/myReport/:reporterId/:teamId')
.get(/* requireAuth, */Report.getReportsByReporterAndTeam, FlatReport.getFlatReports);

ReportRoute.route('/near/:long/:lat/:radius')
.get(/* requireAuth, */ Report.getReportsByNear, FlatReport.getFlatReports);

ReportRoute.route('/attachments/:reportId')
.get(/* requireAuth, */Report.getReportAttachments);

module.exports = ReportRoute;
