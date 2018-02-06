const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const ReporterHelper = require('../helpers/reporter.helper');

const getReporters = async (req, res, next) => {
  try {
    const getR = await ReporterHelper.getReporters();
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    SuccessHelper.success(res, getR.reporters);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getReportById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getR = await ReporterHelper.getReporterById(id);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    SuccessHelper.success(res, getR.reporter);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
}

const getReportersByHostId = async (req, res, next) => {
  const { hostId } = req.params;
  try {
    const getR = await ReporterHelper.getReporterByHost(hostId);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    SuccessHelper.success(res, getR.reporters);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const updateReporter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateR = await ReporterHelper.updateReport(id, req.body);
    if (updateR.err) {
      return ErrorHelper.ClientError(res, {error: updateR.err}, 400);
    }
    SuccessHelper.success(res, updateR.reporter);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const deleteReporter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteR = await ReporterHelper.deleteReporter(id);
    if (deleteR.err) {
      return ErrorHelper.ClientError(res, { error: deleteR.err }, 400);
    }
    SuccessHelper.success(res, deleteR.report);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getReports: getReports,
  getReportById: getReportById,
  getReportsByHostId: getReportsByHostId,
  updateReport: updateReport,
  deleteReport: deleteReport
};