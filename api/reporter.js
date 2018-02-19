const ReporterHelper = require('../helpers/reporter.helper');
const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');

const getReporters = async (req, res, next) => {
  try {
    const getR = await ReporterHelper.getReporters();
    if (getR.err) {
      return ErrorHelper.ClientError(res, {error: getR.err}, 400);
    }
    if(req.query.flat) {
      const data = getR.reporters;
      req.reporters = data;
      return next();
    }
    SuccessHelper.success(res, getR.reporters);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getReporterById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getRBI = await ReporterHelper.getReporterById(id);
    if (getRBI.err) {
      return ErrorHelper.ClientError(res, {error: getRBI.err}, 400);
    }
    SuccessHelper.success(res, getRBI.reporter);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const getReportersByHost = async (req, res, next) => {
  const { hostId } = req.params;
  try {
    const getRBH = await ReporterHelper.getReportersByHost(hostId);
    if (getRBH.err) {
      return ErrorHelper.ClientError(res, {error: getRBH.err}, 400);
    }
    SuccessHelper.success(res, getRBH.reporters);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const blockReporter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blockR = await ReporterHelper.blockReporter(id);
    if (blockR.err) {
      return ErrorHelper.ClientError(res, {error: blockR.err}, 400);
    }
    SuccessHelper.success(res, {message: `User ID: ${id} has been blocked`});
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const unBlockReporter = async (req, res, next) => {
  const { id } = req.params;
  try {
    const unblockR = await ReporterHelper.unBlockReporter(id);
    if (unblockR.err) {
      return ErrorHelper.ClientError(res, {error: unblockR.err}, 400);
    }
    SuccessHelper.success(res, {message: `User ID: ${id} has been unblocked`});
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  getReporters: getReporters,
  getReporterById: getReporterById,
  blockReporter: blockReporter,
  unBlockReporter: unBlockReporter,
  getReportersByHost: getReportersByHost
};
