const ReportTypeHelper = require('../helpers/reportType.helper');
const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');

const getReportTypes = async (req, res, next) => {
  try {
    const getRT = await ReportTypeHelper.getReportTypes(req.body);
    if (getRT.err) {
      return ErrorHelper.ClientError(res, {err: getRT.err}, 400);
    }
    SuccessHelper.success(res, getRT.reportTypes);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const createReportType = async (req, res, next) => {
  try {
    const createRT = await ReportTypeHelper.createReportType(req.body);
    if (createRT.err) {
      return ErrorHelper.ClientError(res, {error: createRT.err}, 400);
    }
    SuccessHelper.success(res, createRT.reportType);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const updateReportType = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateRT = await ReportTypeHelper.updateReportType(id, req.body);
    if (updateRT.err) {
      return ErrorHelper.ClientError(res, {error: updateRT.err}, 400);
    }
    SuccessHelper.success(res, updateRT.reportType);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

const deleteReportType = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteRT = await ReportTypeHelper.deleteReportType(_id);
    if (deleteRT.err) {
      return ErrorHelper.ClientError(rea, {error: deleteRT.err}, 400);
    }
    SuccessHelper.success(res, deleteRT.reportType);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getReportTypes: getReportTypes,
  createReportType: createReportType,
  updateReportType: updateReportType,
  deleteReportType: deleteReportType
};