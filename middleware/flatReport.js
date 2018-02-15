const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const ReportHelper = require('../helpers/report.helper');

const getFlatReports = async (req, res, next) => {
  try {
    if (!req.reports) {
      return ErrorHelper.ClientError(res, {error: 'no reports'}, 400);
    }
    const flatReports = await Promise.all(req.reports.map(async(d) => {
      const flatR = await ReportHelper.flatReport(d);
      if (flatR.report !== null) {
        return flatR.report;
      } else {
        delete flatR.report;
      }
    }));
    SuccessHelper.success(res, flatReports);
  }
  catch (e) {

  }
};

module.exports = {
  getFlatReports: getFlatReports
};
