const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const ReportHelper = require('../helpers/report.helper');
const ReportTypeHelper = require('../helpers/reportType.helper');

const getReports = async (req, res, next) => {
  try {
    const getR = await ReportHelper.getReports();
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    SuccessHelper.success(res, getR.reports);
  }
  catch (e) {
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
    const getR = await ReportHelper.getReportByHost(hostId);
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    SuccessHelper.success(res, getR.reports);
  }
  catch (e) {
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
      return ErrorHelper.ClientError(res, { error: getR.err }, 400);
    }
    if (req.files.length === 0) {
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

module.exports = {
  getReports: getReports,
  getReportById: getReportById,
  getReportsByHostId: getReportsByHostId,
  getReportsByReportType: getReportsByReportType,
  createReport: createReport,
  updateReport: updateReport,
  deleteReport: deleteReport
};
