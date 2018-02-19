const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const ReporterHelper = require('../helpers/reporter.helper');

const getFlatReporters = async (req, res, next) => {
  try {
    if (!req.reporters) {
      return ErrorHelper.ClientError(res, {error: 'No Reporters'}, 400);
    }
    const flatReporters = await Promise.all(req.reporters.map(async(d) => {
      const flatR = await ReporterHelper.flatReporter(d);
      if (flatR.reporter !== null) {
        return flatR.reporter;
      } else {
        delete flatR.reporter;
      }
    }));
    SuccessHelper.success(res, flatReporters);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getFlatReporters: getFlatReporters
};