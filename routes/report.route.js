const express = require('express');
const passport = require('passport');
const passportService = require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Report = require('../api/report');
const ReportRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');
const ReportFormValidator = require('../validator/report.validator');
const ExpressJoi = require('express-joi-validator');
const ReportValidation = require('../validation/report.validation');

const FlatReport = require('../middleware/flatReport');
const TransReport = require('../middleware/transReport');
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

ReportRoute.route('/public')
.get(ExpressJoi(ReportValidation.getSchema), Report.getPublicReports, TransReport.translate, FlatReport.getFlatReports);

ReportRoute.route('/:id')
.get(/*requireAuth,*/ Report.getReportById, TransReport.translateOnly)
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

// used by app
ReportRoute.route('/near/:long/:lat/:radius')
.get(/* requireAuth, */ Report.getReportsByNear, TransReport.translate, FlatReport.getFlatReports);

// used by app old '/reporter/:reporterId'
ReportRoute.route('/clean/reporter/:reporterId')
.get(/* requireAuth, */ Report.getReportByReporterClean, TransReport.translate, FlatReport.getFlatReports);

ReportRoute.route('/attachments/:reportId')
.get(/* requireAuth, */Report.getReportAttachments);

module.exports = ReportRoute;
