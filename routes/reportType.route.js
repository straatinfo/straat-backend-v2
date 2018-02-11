const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const ReportType = require('../api/reportType');
const ReportTypeRoute = express.Router();

ReportTypeRoute.route('/')
.get(/*requireAuth,*/ ReportType.getReportTypes)
.post(/*requireAuth,*/ ReportType.createReportType);

ReportTypeRoute.route('/:id')
.put(/*requireAuth,*/ ReportType.updateReportType)
.delete(/*requireAuth,*/ ReportType.deleteReportType);

module.exports = ReportTypeRoute;
