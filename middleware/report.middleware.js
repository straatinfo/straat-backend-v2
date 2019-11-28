const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const ReportHelper = require('../helpers/report.helper');
const ReportTypeHelper = require('../helpers/reportType.helper');
const ReporterHelper = require('../helpers/reporter.helper');
const MailingHelper = require('../helpers/mailing.helper');
const HostHelper = require('../helpers/host.helper');
const conversationHelper = require('../helpers/conversationV2.helper');
const Promise = require('bluebird');

const createReportTypeC = async (req, res, next) => {
  try {
    if (!req.body.teamList || req.body.teamList.length === 0) {
      return ErrorHelper.ClientError(res, {error: 'Team List Cannot be empty'}, 400);
    }
    const { teamList } = req.body;
    // loop tru teamList
    let success = [], error = [];
    // const processSendingReport = await Promise.all(teamList.map(async(_team) => {
    //   try {
    //     const getGeneratedCode = await ReportHelper.reportIdGenerator(req.body._reportType);
    //     if (getGeneratedCode.err) {
    //       return error.push(getGeneratedCode.err);
    //     ,.ˆ}
    //     const createR = await ReportHelper.createReport({...req.body, isInMap: req.body.isInMap, '_team': _team, generatedReportId: getGeneratedCode.generatedReportId});
    //     if (createR.err) {
    //       return error.push(createR.err);
    //     } 
    //     // send emails 
    //     const { _reportType, _reporter, _host, _mainCategory, _subCategory, host, description, reporter, location, createdAt } = createR.report;
    //     const { code } = _reportType;
    //     switch (code.toUpperCase()) {
    //       case 'C':
    //        // bakit _reporter email tong andito?
    //         const sendReportCNotifToReporter = await MailingHelper.sendReportCNotifToReporter(_reporter.email, createdAt, _mainCategory ? _mainCategory.name || null : null, location, description);
    //         if (sendReportCNotifToReporter.err) {
    //           error.push('Unable to send mail notifications at this time');
    //         }
    //       break;
    //       default:
    //         null
    //       break;
    //     }
      
    //     // send photos
    //     if (req.body.reportUploadedPhotos && req.body.reportUploadedPhotos.length !== 0) {
    //       const saveReportUploadedPhotos = await Promise.all(req.body.reportUploadedPhotos.map(async(photo) => {
    //         // there is somehtin wrong saving here couse in public_id
    //         // wil be return after change the model in public_id to not unique
    //         const savePhoto = await ReportHelper.saveUploadedPhotoReport(createR.report._id, {...photo, public_id: photo.public_id + '##' + createR.report._id});
    //         if (savePhoto.err) {
    //           return savePhoto.err;
    //         }
    //         return savePhoto.reportPhoto;
    //       }));
    //       // return success.push(createR.report);
    //     }
    

    //     const getR = await ReportHelper.getReportByQueryObjectClean({_id: createR.report._id});
    //     success.push(getR.reports[0]);
    //   }
    //   catch (e) {
    //     console.log('error in type c: ', e)
    //     error.push(e);
    //   }
    // }));

    const getGeneratedCode = await ReportHelper.reportIdGenerator(req.body._reportType);
    if (getGeneratedCode.err) {
    
    }
    const createR = await ReportHelper.createReport({
      ...req.body,
      isInMap: req.body.isInMap,
      '_team': req.body._team,
      generatedReportId: getGeneratedCode.generatedReportId,
      teams: teamList
    });

    if (req.body.reportUploadedPhotos && req.body.reportUploadedPhotos.length !== 0) {
      const saveReportUploadedPhotos = await Promise.all(req.body.reportUploadedPhotos.map(async(photo) => {
        // there is somehtin wrong saving here couse in public_id
        // wil be return after change the model in public_id to not unique
        const savePhoto = await ReportHelper.saveUploadedPhotoReport(createR.report._id, {...photo, public_id: photo.public_id + '##' + createR.report._id});
      }));
      // return success.push(createR.report);
    }

    if (createR.err) return Promise.reject({success: false, error: 'Unable to create report'});

    const { _user, _team} = req.body;

    const conversation = await conversationHelper.__createReportCChat(_user, _team, createR.report._id, teamList);


    // send email
    const { _reportType, _reporter, _host, _mainCategory, host, description, reporter, location, createdAt } = createR.report;
    const { code } = _reportType;

    const sendReportCNotifToReporter = await MailingHelper.sendReportCNotifToReporter(_reporter.email, createdAt, _mainCategory ? _mainCategory.name || null : null, location, description, 'nl');

    SuccessHelper.success(res, {report: createR.report});
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  createReportTypeC: createReportTypeC
};
