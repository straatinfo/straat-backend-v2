const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const ReportHelper = require('../helpers/report.helper');
const ReportTypeHelper = require('../helpers/reportType.helper');
const ReporterHelper = require('../helpers/reporter.helper');
const MailingHelper = require('../helpers/mailing.helper');
const HostHelper = require('../helpers/host.helper');

const createReportTypeC = async (req, res, next) => {
  try {
    if (!req.body.teamList || req.body.teamList.length === 0) {
      return ErrorHelper.ClientError(res, {error: 'Team List Cannot be empty'}, 400);
    }
    const { teamList } = req.body;
    // loop tru teamList
    let success = [], error = [];
    const processSendingReport = await Promise.all(teamList.map(async(_team) => {
      try {
        const getGeneratedCode = await ReportHelper.reportIdGenerator(req.body._reportType);
        if (getGeneratedCode.err) {
          return error.push(getGeneratedCode.err);
        }
        const createR = await ReportHelper.createReport({...req.body, '_team': _team, generatedReportId: getGeneratedCode.generatedReportId});
        if (createR.err) {
          return error.push(createR.err);
        } 
        // send emails
        const { _reportType, _reporter, _host, _mainCategory, _subCategory, host, reporter, location, createdAt } = createR.report;
        const { code } = _reportType;
        switch (code.toUpperCase()) {
          case 'C':
            const sendReportCNotifToReporter = await MailingHelper.sendReportCNotifToReporter(_reporter.email, createdAt, _mainCategory.name, location);
            if (sendReportCNotifToReporter.err) {
              error.push('Unable to send mail notifications at this time');
            }
          break;
          default:
            null
          break;
        }
        // send photos
        if (req.body.reportUploadedPhotos && req.body.reportUploadedPhotos.length !== 0) {
          const saveReportUploadedPhotos = await Promise.all(req.body.reportUploadedPhotos.map(async(photo) => {
            const savePhoto = await ReportHelper.saveUploadedPhotoReport(createR.report._id, photo);
            if (savePhoto.err) {
              console.log(savePhoto.err);
              return savePhoto.err;
            }
            return savePhoto.reportPhoto;
          }));
          return success.push(createR.report);
        }
    
        success.push(createR.report);
      }
      catch (e) {
        error.push(e);
      }
    }));
  
    SuccessHelper.success(res, {error, success});
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  createReportTypeC: createReportTypeC
};
