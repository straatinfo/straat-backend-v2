const ErrorHelper = require('../helpers/error.helper');
const IncidentHelper = require('../helpers/incident.helper');
const db = require('../models');

// route: /
const getLatestIncident = async (req, res, next) => {
  try {
    const getReport = await IncidentHelper.getLatestIncident(null);
    if (getReport.err) {
      ErrorHelper.clientError(res, 400, 'Cannot Get Incidents');
      return;
    }
    res.status(200).send(getReport.reports);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const reportIncident = async (req, res, next) => {
  const {
    title, description, location, lat, long, isVehicleInvolved,
    isPeopleInvolved, vehicleInvolvedDescription, peopleInvolvedCount,
    reporterId, hostId, subCategoryId, incidentTypeId, urgencyId
  } = req.body;

  try {
    const generateIncidentId = await IncidentHelper.incidentIdGenerator(incidentTypeId);

    if (generateIncidentId.err) {
      ErrorHelper.clientError(res, 400, generateIncidentId.err);
      return;
    }

    const incidentId = generateIncidentId.incidentId;

    const createReport = await IncidentHelper.reportIncident(
      title, description, location, lat, long, isVehicleInvolved,
      isPeopleInvolved, vehicleInvolvedDescription, peopleInvolvedCount,
      reporterId, hostId, subCategoryId, incidentTypeId, urgencyId, incidentId
    );

    if (createReport.err) {
      ErrorHelper.clientError(res, 400, createReport.err);
      return;
    }
    res.status(200).send(createReport.report);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

// route: /:id
const getIncidentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getIncident = await IncidentHelper.getIncidentById(id);
    if (getIncident.err) {
      ErrorHelper.clientError(res, 400, getIncident.err);
      return;
    }
    res.status(200).send(getIncident.incident);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const updateIncident = async (req, res, next) => {
  const { id } = req.params;
  const { note, status } = req.body;
  try {
    const updateIncident = await IncidentHelper.updateIncident(id, note, status);
    if (updateIncident.err) {
      ErrorHelper.clientError(res, 400, updateIncident.err);
      return;
    }
    res.status(200).send(updateIncident.incident);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const deleteIncident = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteIncident = await IncidentHelper.deleteIncident(id);
    if (deleteIncident.err) {
      ErrorHelper.clientError(res, 400, deleteIncident.err);
      return;
    }
    res.status(200).send({affectedRows:deleteIncident.affectedRows});
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

// route: /page/:pageNumber/:itemPerPage
const getIncidentByPage = async (req, res, next) => {
  const { pageNumber, itemPerPage } = req.params;
  try {
    const getReports = await IncidentHelper.getLatestIncidentByPage(itemPerPage, pageNumber);
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

// route: /category/:incidentType
const getIncidentByIncidentType = async (req, res, next) => {
  const { incidentType } = req.params;
  try {
    const queryOption = { incidentType: incidentType };
    const getReports = await IncidentHelper.getLatestIncident(queryOption);
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

// route: /category/:inidentType/page/:pageNumber/:itemPerPage
const getIncidentByIncidentTypeByPage = async (req, res, next) => {
  const { incidentType, pageNumber, itemPerPage } = req.params;
  try {
    const queryOption = { incidentType: incidentType };
    const getReports = await IncidentHelper.getLatestIncidentByPage(itemPerPage, pageNumber, queryOption);
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
  reportIncident: reportIncident,
  getLatestIncident: getLatestIncident,
  getIncidentByPage: getIncidentByPage,
  getIncidentByIncidentType: getIncidentByIncidentType,
  getIncidentByIncidentTypeByPage: getIncidentByIncidentTypeByPage,
  getIncidentById: getIncidentById,
  updateIncident: updateIncident,
  deleteIncident: deleteIncident
};
