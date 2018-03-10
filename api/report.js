const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const ReportHelper = require('../helpers/report.helper');
const ReportTypeHelper = require('../helpers/reportType.helper');
const ReporterHelper = require('../helpers/reporter.helper');
const MailingHelper = require('../helpers/mailing.helper');
const HostHelper = require('../helpers/host.helper');

const getReports = async (req, res, next) => {
  try {
    const getR = await ReportHelper.getReports();
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    if (req.query.flat) {
      const data = getR.reports;
      req.reports = data;
      return next();
    }
    SuccessHelper.success(res, getR.reports);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const getReportById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getR = await ReportHelper.getReportById(id);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    SuccessHelper.success(res, getR.report);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
}

const getReportsByHostId = async (req, res, next) => {
  const { hostId } = req.params;
  try {
    const getReportTypeA = await ReportTypeHelper.getReportTypeByCode('A');
    if (getReportTypeA.err) {
      return ErrorHelper.ClientError(res, {error: getReportTypeA.err});
    }
    const getR = await ReportHelper.getReportByHost(hostId, getReportTypeA.reportType._id);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    if (req.query.flat) {
      const data = getR.reports;
      req.reports = data;
      return next();
    }
    SuccessHelper.success(res, getR.reports);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const getReportsByReportType = async (req, res, next) => {
  const { reportTypeId } = req.params;
  try {
    const getR = await ReportHelper.getReportsByReportType(reportTypeId);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    if (req.query.flat) {
      const data = getR.reports;
      req.reports = data;
      return next();
    }
    SuccessHelper.success(res, getR.reports);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const createReport = async (req, res, next) => {
  try {
    const getGeneratedCode = await ReportHelper.reportIdGenerator(req.body._reportType);
    if (getGeneratedCode.err) {
      return ErrorHelper.ClientError(res, {error: getGeneratedCode.err}, 400);
    }
    const createR = await ReportHelper.createReport({...req.body, generatedReportId: getGeneratedCode.generatedReportId});
    if (createR.err) {
      return ErrorHelper.ClientError(res, { error: createR.err }, 400);
    }
    if (!req.files || req.files.length === 0) {
      return SuccessHelper.success(res, {report: createR.report});
    }
    const saveRP = await ReportHelper.saveUploadLooper(createR._id, req.dataArray, ReportHelper.saveUploadedPhotoReport);
    return SuccessHelper.success(res, {report: createR.report, reportPhotos: saveRP.success });    
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const createReportV2 = async (req, res, next) => {
  try {
    if (req.reportTypeCode && req.reportTypeCode.toUpperCase() === 'C') {
      return next();
    }
    const getGeneratedCode = await ReportHelper.reportIdGenerator(req.body._reportType);
    if (getGeneratedCode.err) {
      return ErrorHelper.ClientError(res, {error: getGeneratedCode.err}, 400);
    }
    const createR = await ReportHelper.createReport({...req.body, generatedReportId: getGeneratedCode.generatedReportId});
    if (createR.err) {
      return ErrorHelper.ClientError(res, { error: createR.err }, 400);
    }
    // send emails
    const { _reportType, _reporter, _host, _mainCategory, _subCategory, host, reporter, location, createdAt } = createR.report;
    const { code } = _reportType;
    switch (code.toUpperCase()) {
      case 'A':
        const sendReportANotifToHost = await MailingHelper.sendReportANotifToHost(_reporter.username, _host.hostName, _host.email, '', '', null, _mainCategory.name, _subCategory.name, location );
        const sendReportANotifReporter = await MailingHelper.sendReportANotifToReporter(_reporter.email, null, location, createdAt, _mainCategory.name, _subCategory.name);
        if (sendReportANotifToHost.err || sendReportANotifReporter.err) {
          return ErrorHelper.ClientError(res, {error: 'Unable to send mail notifications at this time'}, 400);
        }
      break;
      case 'B':
        const sendReportBNotifToReporter = await MailingHelper.sendReportBNotifToReporter(_reporter.email, createdAt, _mainCategory.name, location);
        if (sendReportBNotifToReporter.err) {
          return ErrorHelper.ClientError(res, {error: 'Unable to send mail notifications at this time'}, 400);
        }
      break;
      case 'C':
        const sendReportCNotifToReporter = await MailingHelper.sendReportCNotifToReporter(_reporter.email, createdAt, _mainCategory.name, location);
        if (sendReportCNotifToReporter.err) {
          return ErrorHelper.ClientError(res, {error: 'Unable to send mail notifications at this time'}, 400);
        }
      break;
      default:
        null
      break;
    }

    // send photos
    console.log(req.body.reportUploadedPhotos);
    if (req.body.reportUploadedPhotos && req.body.reportUploadedPhotos.length !== 0) {
      const saveReportUploadedPhotos = await Promise.all(req.body.reportUploadedPhotos.map(async(photo) => {
        const savePhoto = await ReportHelper.saveUploadedPhotoReport(createR.report._id, photo);
        console.log(savePhoto);
        if (savePhoto.err) {
          console.log(savePhoto.err);
          return savePhoto.err;
        }
        return savePhoto.reportPhoto;
      }));
      return SuccessHelper.success(res, createR.report);
    }

    SuccessHelper.success(res, createR.report);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const updateReport = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateR = await ReportHelper.updateReport(id, req.body);
    if (updateR.err) {
      return ErrorHelper.ClientError(res, {error: updateR.err}, 400);
    }
    SuccessHelper.success(res, updateR.report);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const deleteReport = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteR = await ReportHelper.deleteReport(id);
    if (deleteR.err) {
      return ErrorHelper.ClientError(res, { error: deleteR.err }, 400);
    }
    SuccessHelper.success(res, deleteR.report);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getReportByReporter = async (req, res, next) => {
  const { reporterId } = req.params;
  try {
    const queryObject = {'_reporter': reporterId};
    const getRBR = await ReportHelper.getReportByQueryObject(queryObject);
    if (getRBR.err) {
      return ErrorHelper.ClientError(res, {error: getRBR.err}, 400);
    }
    if (req.query.flat) {
      const data = getRBR.reports;
      req.reports = data;
      return next();
    }
    SuccessHelper.success(res, getRBR.reports);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getReportNearBy = async (req, res, next) => {
  const { long, lat, radius } = req.params;
  try {
    if (!req.params || !long || !lat || !radius) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Parameters'}, 200);
    }
    const longOffsetMax = parseFloat(long) + parseFloat(radius);
    const longOffsetMin = parseFloat(long) - parseFloat(radius);
    const latOffsetMax = parseFloat(lat) + parseFloat(radius);
    const latOffsetMin = parseFloat(lat) - parseFloat(radius);
    const queryObject = {
      $or: [
        {
          $and: [
            { 'long': { $gte: longOffsetMin } },
            { 'long': { $lte: longOffsetMax } }
          ],
          $and: [
            { 'lat': { $gte: latOffsetMin } },
            { 'lat': { $lte: latOffsetMax } }
          ]
        }
      ]};
    const getRNB = await ReportHelper.getReportByQueryObject(queryObject);
    if (getRNB.err) {
      return ErrorHelper.ClientError(res, {error: getRNB.err}, 400);
    }
    if (req.query.flat) {
      const data = getRNB.reports;
      req.reports = data;
      return next();
    }
    SuccessHelper.success(res, getRNB.reports);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const changeReportStatus = async (req, res, next) => {
  const { reportId } = req.params;
  const { status } = req.body;
  try {
    const changeRS = await ReportHelper.changeReportStatus(reportId, status);
    if (changeRS.err) {
      return ErrorHelper.ClientError(res, {error: changeRS.err}, 400);
    }
    SuccessHelper.success(res, changeRS.report);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const getReportsByReporterAndTeam = async (req, res, next) => {
  const { reporterId, teamId } = req.params;
  try {
    const queryObject = { $or: [ { '_reporter': reporterId }, { '_team': teamId } ] };
    const getR = await ReportHelper.getReportByQueryObject(queryObject);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    if (req.query && req.query.flat === 'true') {
      req.reports = getR.reports;
      return next();
    }
    SuccessHelper.success(res, getR.reports);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getReports: getReports,
  getReportById: getReportById,
  getReportsByHostId: getReportsByHostId,
  getReportsByReportType: getReportsByReportType,
  createReport: createReport,
  updateReport: updateReport,
  deleteReport: deleteReport,
  getReportByReporter: getReportByReporter,
  getReportNearBy: getReportNearBy,
  createReportV2: createReportV2,
  changeReportStatus: changeReportStatus,
  getReportsByReporterAndTeam: getReportsByReporterAndTeam
};
