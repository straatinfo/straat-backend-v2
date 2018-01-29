const ErrorHelper = require('../helpers/error.helper');
const UrgencyHelper = require('../helpers/urgency.helper');

const getUrgencies = async (req, res, next) => {
  try {
    const getU = await UrgencyHelper.getUrgencies();
    if (getU.err) {
      ErrorHelper.clientError(res, 400, getU.err);
      return;
    }
    res.status(200).send(getU.urgencies);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const createUrgency = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const createU = await UrgencyHelper.createUrgency(name, description);
    if (createU.err) {
      ErrorHelper.clientError(res, 400, createU.err);
      return;
    }
    res.status(200).send(createU.urgency);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const updateUrgency = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updateU = await UrgencyHelper.updateUrgency(id, name, description);
    if (updateU.err) {
      ErrorHelper.clientError(res, 400, updateU.err);
      return;
    }
    res.status(200).send(updateU.urgency);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const deleteUrgency = async (req, res, next) => {
  const { id } = req.params;
  try {
    deleteU = await UrgencyHelper.deleteUrgency(id);
    if (deleteU.err) {
      ErrorHelper.clientError(res, 400, deleteU.err);
      return;
    }
    res.status(200).send({affectedRows: deleteU.affectedRows});
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};


module.exports = {
  getUrgencies: getUrgencies,
  createUrgency: createUrgency,
  updateUrgency: updateUrgency,
  deleteUrgency: deleteUrgency
};
