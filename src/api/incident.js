const ErrorHelper = require('../helpers/error.helper');
const ReportHelper = require('../helpers/report.helper');
const db = require('../models');

// route: /
const getLatestReport = async (req, res, next) => {
  try {
    const getReport = await ReportHelper.getLatestReport();
    if (getReport.err) {
      ErrorHelper.clientError(res, 400, 'Cannot Get Reports');
      return;
    }
    res.status(200).send(getReport.reports);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const reportReport = async (req, res, next) => {
  const {
    title, description, location, lat, long, isVehicleInvolved,
    isPeopleInvolved, vehicleInvolvedDescription, peopleInvolvedCount,
    reporterId, hostId, mainCategoryId,  subCategoryId, reportTypeId, urgencyId
  } = req.body;

  try {
    const generateReportId = await ReportHelper.reportIdGenerator(reportTypeId);

    if (generateReportId.err) {
      ErrorHelper.clientError(res, 400, generateReportId.err);
      return;
    }

    const generatedReportId = generateReportId.generatedReportId;

    const createReport = await ReportHelper.reportReport(
      title, description, location, lat, long, isVehicleInvolved,
      isPeopleInvolved, vehicleInvolvedDescription, peopleInvolvedCount,
      reporterId, hostId, subCategoryId, reportTypeId, urgencyId, generatedReportId, mainCategoryId
    );

    if (createReport.err) {
      ErrorHelper.clientError(res, 400, createReport.err);
      return;
    }
    res.status(200).send(createReport.report);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.serverError(res);
  }
};

// route: /:id
const getReportById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getReport = await ReportHelper.getReportById(id);
    if (getReport.err) {
      ErrorHelper.clientError(res, 400, getReport.err);
      return;
    }
    res.status(200).send(getReport.report);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const updateReport = async (req, res, next) => {
  const { id } = req.params;
  const { note, status } = req.body;
  try {
    const updateReport = await ReportHelper.updateReport(id, note, status);
    if (updateReport.err) {
      ErrorHelper.clientError(res, 400, updateReport.err);
      return;
    }
    res.status(200).send(updateReport.report);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const deleteReport = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteReport = await ReportHelper.deleteReport(id);
    if (deleteReport.err) {
      ErrorHelper.clientError(res, 400, deleteReport.err);
      return;
    }
    res.status(200).send({affectedRows:deleteReport.affectedRows});
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

// route: /page/:pageNumber/:itemPerPage
const getReportByPage = async (req, res, next) => {
  const { pageNumber, itemPerPage } = req.params;
  try {
    const getReports = await ReportHelper.getLatestReportByPage(itemPerPage, pageNumber);
    if (getReports.err) {
      ErrorHelper.clientError(res, 400, getReports.err);
      return;
    }
    res.status(200).send(getReports.reports);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

// route: /category/:reportTypeId
const getReportByReportType = async (req, res, next) => {
  const { reportTypeId } = req.params;
  try {
    const queryOption = { reportTypeId: reportTypeId };
    const getReports = await ReportHelper.getLatestReport(queryOption);
    if (getReports.err) {
      ErrorHelper.clientError(res, 400, 'Invalid Arguments');
      return;
    }
    console.log(getReports);
    res.status(200).send(getReports.reports);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

// route: /category/:inidentType/page/:pageNumber/:itemPerPage
const getReportByReportTypeByPage = async (req, res, next) => {
  const { reportTypeId, pageNumber, itemPerPage } = req.params;
  try {
    const queryOption = { reportTypeId: reportTypeId };
    const getReports = await ReportHelper.getLatestReportByPage(itemPerPage, pageNumber, queryOption);
    if (getReports.err) {
      ErrorHelper.clientError(res, 400, 'Invalid Arguments');
      return;
    }
    res.status(200).send(getReports.reports);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

module.exports = {
  reportReport: reportReport,
  getLatestReport: getLatestReport,
  getReportByPage: getReportByPage,
  getReportByReportType: getReportByReportType,
  getReportByReportTypeByPage: getReportByReportTypeByPage,
  getReportById: getReportById,
  updateReport: updateReport,
  deleteReport: deleteReport
};
