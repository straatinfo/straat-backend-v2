const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const ReportType = require('../api/reportType');
const ReportTypeRoute = express.Router();

ReportTypeRoute.route('/')
.get(/*requireSignin,*/ ReportType.getReportTypes)
.post(/*requireSignin,*/ ReportType.createReportType);

ReportTypeRoute.route('/:id')
.put(/*requireSignin,*/ ReportType.updateReportType)
.delete(/*requireSignin,*/ ReportType.deleteReportType);

module.exports = ReportTypeRoute;
