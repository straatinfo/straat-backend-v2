const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const ReportHelper = require('../helpers/report.helper');
const ReportTypeHelper = require('../helpers/reportType.helper');
const ReporterHelper = require('../helpers/reporter.helper');
const TeamHelper = require('../helpers/team.helper');
const MailingHelper = require('../helpers/mailing.helper');
const HostHelper = require('../helpers/host.helper');
const TeamTransform = require('../transform/team.transform');
const LanguageHelper = require('../helpers/language.helper');
const Translator = require('./../middleware/translator');
const Languages = require('./../assets/jsonfiles/constants').Langauges
const SSS = require('../service/ServerSocketService')

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
    if (req.query.flat == 'true') {
      const report = await ReportHelper.flatReport(getR.report);
      if (report.err) {
        return ErrorHelper.ClientError(res, {error: report.err}, 400);
      }
      return SuccessHelper.success(res, report.report);
    }
    req.result = getR.report
    return next()
    // SuccessHelper.success(res, getR.report);
  }
  catch (e) {
    console.log(e)
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
    const getR = await ReportHelper.getReportByHost(hostId);
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
    if (!createR.report) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Input'}, 422);
    }
    if (!req.files || req.files.length === 0) {
      return SuccessHelper.success(res, {report: createR.report});
    }
    const getR = await ReportHelper.getReportById(createR.report._id);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 422);
    }
    if (req.query.flat == 'true') {
      const flatR = await ReportHelper.flatReport(getR.report);
      if (flatR.err) {
        return ErrorHelper.ClientError(res, { error: flatR.err }, 422);
      }
      SuccessHelper.success(res, flatR.report);
    }
    const saveRP = await ReportHelper.saveUploadLooper(createR._id, req.dataArray, ReportHelper.saveUploadedPhotoReport);
    return SuccessHelper.success(res, {report: getR.report, reportPhotos: saveRP.success });    
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const createReportV2 = async (req, res, next) => {
  // error in converting createAt in model report
  // due to may 32
  try {
    let langUserMain, langUserSub, langUser, teamName, teamEmail
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
    if (!createR.report) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Input'}, 422);
    }
    // tanslate

 
    // send emails
    const { _reportType, _reporter, _host, _mainCategory, _subCategory, description, host, reporter, location, createdAt, _team } = createR.report;
    teamName = ''
    teamEmail = ''
    if (_team) {
      teamName = _team.teamName
      teamEmail = _team.teamEmail
    }
    const team = _team ? await TeamHelper.getTeamLeadersByTeamId(_team._id) : ''
    const lang = _host.language
    const teamLeadersEmail = _team ? TeamTransform.getEmail({model: 'teamLeaders', data: team.teamLeaders, isArray: true}) : []
    // get trans of this
    const { code } = _reportType
    const mainName = _mainCategory ? _mainCategory.name : ''
    const subName = _subCategory ? _subCategory.name: ''
  
    switch (code.toUpperCase()) {
      case 'A':
        const reportDeeplink = `https://straatinfo-frontend-v2-staging.herokuapp.com/public/report/${createR.report._id}`;
        // const sendReportANotifToHost = await MailingHelper.sendReportANotifToHost(_reporter.username, _host.hostName, _host.email, teamName, teamEmail, null, mainName, subName, location, reportDeeplink, lang);
        const sendReportANotifToHost = await MailingHelper.sendReportANotifToHost(_reporter.username, _host.hostName, _host.email, teamName, teamEmail, description, mainName, subName, location, reportDeeplink, lang);

        // sendReportANotifToReporter (reporterEmail, teamLeaderEmail, location, date, category1, category2 = null, text = null)
        // email to user
        langUser = createR._reporter ? createR._reporter.language || 'nl' : 'nl'
        langUserMain = _mainCategory ? _mainCategory.name : ''
        langUserSub = _subCategory ? _subCategory.name : ''
        // const sendReportANotifReporter = await MailingHelper.sendReportANotifToReporter('isens.jaylord@gmail.com', teamLeadersEmail, location, createdAt, langUserMain, langUserSub, null, langUser);
        const sendReportANotifReporter = await MailingHelper.sendReportANotifToReporter(_reporter.email, teamLeadersEmail, location, createdAt, langUserMain, langUserSub, description, langUser);
        if (sendReportANotifToHost.err || sendReportANotifReporter.err) {
          console.log('sendReportANotifToHost.err || sendReportANotifReporter.err', sendReportANotifToHost.err, sendReportANotifReporter.err)
          // return ErrorHelper.ClientError(res, {error: 'Unable to send mail notifications at this time'}, 400);
        }
      break; 
      case 'B':
        // const sendReportBNotifToReporter = await MailingHelper.sendReportBNotifToReporter(_reporter.email, createdAt, mainName, location);
        const sendReportBNotifToReporter = await MailingHelper.sendReportBNotifToReporter(_reporter.email, createdAt, mainName, location, description);
        if (sendReportBNotifToReporter.err) {
          console.log('sendReportBNotifToReporter.err', sendReportBNotifToReporter.err)
          // return ErrorHelper.ClientError(res, {error: 'Unable to send mail notifications at this time'}, 400);
        }
      break;
      case 'C':
        const sendReportCNotifToReporter = await MailingHelper.sendReportCNotifToReporter(_reporter.email, createdAt, mainName, location, description);
        if (sendReportCNotifToReporter.err) {
          console.log('sendReportBNotifToReporter.err', sendReportBNotifToReporter.err)
          // return ErrorHelper.ClientError(res, {error: 'Unable to send mail notifications at this time'}, 400);
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
        if (savePhoto.err) {
          return savePhoto.err;
        }
        return savePhoto.reportPhoto;
      }));
      // return SuccessHelper.success(res, createR.report);
    }
    const getR = await ReportHelper.getReportById(createR.report._id);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    // here will be space for sending notification offline base | socket base
    SSS.report.creation(req, getR.report)
    
    if (req.query.flat == 'true') {
      const flatR = await ReportHelper.flatReport(getR.report);
      if (flatR.err) {
        return ErrorHelper.ClientError(res, {error: flatR.err}, 422);
      }
      return SuccessHelper.success(res, flatR.report);
    }
    // translate report base on reporters host language
    let result = getR.report
    
    if (Languages[lang]) {
      const transCollection = new Translator.TransCollection()
      result = await Translator.translate(result, '_mainCategory', 'name', lang, transCollection)
      result = await Translator.translate(result, '_subCategory', 'name', lang, transCollection)
    }

    SuccessHelper.success(res, result);
  }
  catch (e) {
    console.log('createReportV2', e);
    ErrorHelper.ServerError(res);
  }
};

const updateReport = async (req, res, next) => {
  console.log('updating........');
  const { id } = req.params;
  try {
    const updateR = await ReportHelper.updateReport(id, req.body);
    if (updateR.err) {
      return ErrorHelper.ClientError(res, {error: updateR.err}, 400);
    }
    if (!updateR.report) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Report ID'}, 422);
    }
    const getR = await ReportHelper.getReportById(updateR.report._id);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 422);
    }
    if (req.query.flat == 'true') {
      const flatR = await ReportHelper.flatReport(getR.report);
      if (flatR.err) {
        return ErrorHelper.ClientError(res, {error: flatR.err}, 422);
      }
      return SuccessHelper.success(res, flatR.report);
    }
    SuccessHelper.success(res, getR.report);
  }
  catch (e) {
    console.log(e);
    if (e.statusCode) {
      return res.status(e.statusCode).send(e);
    }
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

// clean reports list
const getReportByReporterClean = async (req, res, next) => {
  const { reporterId } = req.params
  try {
    const queryObject = {'_reporter': reporterId};
    const getRBR = await ReportHelper.getReportByQueryObjectClean(queryObject);
    if (getRBR.err) {
      return ErrorHelper.ClientError(res, {error: getRBR.err}, 400);
    }
    req.reports = getRBR.reports
    return next()
    // SuccessHelper.success(res, getRBR.reports);
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

const getReportsByNear = async (req, res, next) => {
  const { long, lat, radius } = req.params
  const { _reporter } = req.query
  try {
    if (!req.params || !long || !lat || !radius) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Parameters'}, 200);
    }
    const { reports, err } = await ReportHelper.getNearbyReports(_reporter, long, lat, radius)
    if (err) {
      return ErrorHelper.ClientError(res, {error: err}, 400);
    }

    req.reports = reports
    return next()
    // SuccessHelper.success(res, result);
  }
  catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res);
  }
};

const changeReportStatus = async (req, res, next) => {
  const { reportId } = req.params;
  const { status } = req.body;
  const { language } = req.query
  try {
    const changeRS = await ReportHelper.changeReportStatus(reportId, status);
    if (changeRS.err) {
      return ErrorHelper.ClientError(res, {error: changeRS.err}, 400);
    }
    if (!changeRS.report) {
      return ErrorHelper.ClientError(res, {error: 'Invalid ID'}, 422);
    }
    const getR = await ReportHelper.getReportById(changeRS.report._id);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 422);
    }
    if (req.query.flat == 'true') {
      const flatR = await ReportHelper.flatReport(getR.report);
      if (flatR.err) {
        return ErrorHelper.ClientError(res, {error: flatR.err}, 422);
      }
      return SuccessHelper.success(res, flatR.report);
    }
    // translate report base on reporters host language
    let result = getR.report

    if (Languages[language]) {
      const transCollection = new Translator.TransCollection()
      result = await Translator.translate(result, '_mainCategory', 'name', language, transCollection)
      result = await Translator.translate(result, '_subCategory', 'name', language, transCollection)
    }

    SuccessHelper.success(res, result);
    // SuccessHelper.success(res, changeRS.report);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const changeIsPublic = async (req, res, next) => {
  const { reportId } = req.params;
  const { isPublic } = req.body;
  const { language } = req.query
  
  try {
    const changeRS = await ReportHelper.changeIsPublic(reportId, isPublic);
    if (changeRS.err) {
      return ErrorHelper.ClientError(res, {error: changeRS.err}, 400);
    }
    if (!changeRS.report) {
      return ErrorHelper.ClientError(res, {error: 'Invalid ID'}, 422);
    }
    const getR = await ReportHelper.getReportById(changeRS.report._id);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 422);
    }
    if (req.query.flat == 'true') {
      const flatR = await ReportHelper.flatReport(getR.report);
      if (flatR.err) {
        return ErrorHelper.ClientError(res, {error: flatR.err}, 422);
      }
      return SuccessHelper.success(res, flatR.report);
    }
    // translate report base on reporters host language
    let result = getR.report

    if (Languages[language]) {
      const transCollection = new Translator.TransCollection()
      result = await Translator.translate(result, '_mainCategory', 'name', language, transCollection)
      result = await Translator.translate(result, '_subCategory', 'name', language, transCollection)
    }

    SuccessHelper.success(res, result);
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

const getReportAttachments = async (req, res, next) => {
  const { reportId } = req.params;
  try {
    const getA = await ReportHelper.getReportAttachments(reportId);
    if (getA.err) { return ErrorHelper.ClientError(res, {error: getA.err}, 400); }
    SuccessHelper.success(res, getA.attachments);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const getPublicReports = async (req, res, next) => {
  try {
    const { _reporter, _reportType } = req.query;
    const reports = await ReportHelper.getPublicReports(_reporter, _reportType);
    if (reports.err) { return ErrorHelper.ClientError(res, {error: reports.err}, 400); }
    req.reports = reports.reports
    return next()
    //SuccessHelper.success(res, reports.reports);
  }
  catch (e) {
    console.log(e);
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
  getReportsByReporterAndTeam: getReportsByReporterAndTeam,
  getReportsByNear: getReportsByNear,
  getReportAttachments: getReportAttachments,
  getReportByReporterClean,
  getPublicReports,
  changeIsPublic
};
