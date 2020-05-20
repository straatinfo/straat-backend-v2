const _ = require('lodash');
const config = require('../../config');
// send report type A
/*
  mainCategoryId - id
  subCategoryId - id
  isUrgent - boolean
  description - string
  images - imageId []
  long - number
  lat - number
  hostId - id
*/
async function _getReportType (req) {
  const code = req.body.reportTypeCode;
  const reportType = await req.db.ReportType.findOne({ code: code.toUpperCase() });
  req.$scope.reportType = reportType;
  return req;
}

async function _createReport(req) {
  const {
    title,
    description,
    location,
    long,
    lat,
    mainCategoryId,
    subCategoryId,
    isUrgent,
    reporterId,
    hostId,
    reportTypeCode,
    teamId,
    attachments = []
  } = req.body;

  const report = await req.db.Report.create({
    title,
    description,
    location,
    long,
    lat,
    _mainCategory: mainCategoryId,
    _subCategory: subCategoryId,
    isUrgent,
    _reporter: reporterId,
    _host: hostId,
    _reportType: req.$scope.reportType._id,
    _team: teamId,
    attachments
  });
  req.$scope.report = report;
  return req;
}

async function _populateReport (req) {
  const report = req.$scope.report;
  const populatedReport = await req.db.Report.findById(report._id)
    .populate('_host')
    .populate('_mainCategory')
    .populate('_reporter')
    .populate('_team')
    .populate('_subCategory');

  req.$scope.report = populatedReport;
  return req;
}

async function _sendReportTypeADeepLink (req) {
  const report = req.$scope.report;
  const url = config.urls.FRONT_END_URL;
  const deeplink = `${config.urls.FRONT_END_URL}/public/reports/${report._id}`;
  const hostEmail = report._host.isSpecific ? report._host.email : config.email_address.NEW_HOST_DEFAULT_EMAIL;

  let mainName = report._mainCategory && report._mainCategory.translations && report._mainCategory.translations.length > 1 &&  _.find(report._mainCategory.translations, (mc) => mc.code == 'nl') ?  _.find(report._mainCategory.translations, (mc) => mc.code == 'nl').word : report._subCategory.name;
  let subName = report._subCategory && report._subCategory.translations && report._subCategory.translations.length > 1 &&  _.find(report._subCategory.translations, (mc) => mc.code == 'nl') ?  _.find(report._subCategory.translations, (mc) => mc.code == 'nl').word : (report._subCategory && report._subCategory.name ? report._subCategory.name : '-');
  mainName = mainName ? mainName : '';
  mainName = subName ? subName : '';

  await req.lib.mail.sendReportANotifToHost(
    report._reporter.username,
    report._host.hostName,
    hostEmail,
    report._team.teamName,
    report._team.teamEmail,
    report.description,
    mainName,
    subName,
    report.location,
    deeplink,
    report._host.language
  );

  const hostPersonalEmail = report._host.hostPersonalEmail;

  if (hostPersonalEmail) {
    await req.lib.mail.sendReportANotifToHost(
      report._reporter.username,
      report._host.hostName,
      hostPersonalEmail,
      report._team.teamName,
      report._team.teamEmail,
      report.description,
      mainName,
      subName,
      report.location,
      deeplink,
      report._host.language
    );
  }

  return req;
}

module.exports = {
  _getReportType,
  _createReport,
  _populateReport,
  _sendReportTypeADeepLink
};
