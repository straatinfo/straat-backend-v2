const ErrorHelper = require('../helpers/error.helper');
const IncdentTypeHelper = require('../helpers/incidentType.helper');

// route: /
const getIncidentTypes = async (req, res, next) => {
  try {
    const getIncidentTypes = await IncdentTypeHelper.getIncidentTypes();
    if (getIncidentTypes.err) {
      ErrorHelper.clientError(res, 400, getIncidentTypes.err);
      return;
    }
    res.status(200).send(getIncidentTypes.incidentTypes);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const createIncidentType = async (req, res, next) => {
  const { code, name, description } = req.body;
  try {
    const createdIncidentType = await IncdentTypeHelper.createIncidentType(code, name, description);
    if (createdIncidentType.err) {
      ErrorHelper.clientError(res, 400, createdIncidentType.err);
      return;
    }
    res.status(200).send(createdIncidentType.incidentType);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

// route: /:id
const updateIncidentType = async (req, res, next) => {
  const { id } = req.params;
  const { code, name, description } = req.body;
  try {
    const updatedIncidentType = await IncdentTypeHelper.updateIncidentType(id, code, name, description);
    if (updatedIncidentType.err) {
      ErrorHelper.clientError(res, 400, updatedIncidentType.err);
      return;
    }
    res.status(200).send(updatedIncidentType.incidentType);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.serverError(res);
  }
};

const deleteIncidentType = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedIncidentType = await IncdentTypeHelper.deleteIncidentType(id);
    if (deletedIncidentType.err) {
      ErrorHelper.clientError(res, 400, deletedIncidentType.err);
      return;
    }
    res.status(200).send({affectedRows: deletedIncidentType.affectedRows});
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
}


module.exports = {
  getIncidentTypes: getIncidentTypes,
  createdIncidentType: createIncidentType,
  updateIncidentType: updateIncidentType,
  deleteIncidentType: deleteIncidentType
};
