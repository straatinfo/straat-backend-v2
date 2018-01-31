const ErrorHelper = require('../helpers/error.helper');
const PriorityHelper = require('../helpers/priority.helper');

const getUrgencies = async (req, res, next) => {
  try {
    const getU = await PriorityHelper.getUrgencies();
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

const createPriority = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const createU = await PriorityHelper.createPriority(name, description);
    if (createU.err) {
      ErrorHelper.clientError(res, 400, createU.err);
      return;
    }
    res.status(200).send(createU.priority);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const updatePriority = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updateU = await PriorityHelper.updatePriority(id, name, description);
    if (updateU.err) {
      ErrorHelper.clientError(res, 400, updateU.err);
      return;
    }
    res.status(200).send(updateU.priority);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const deletePriority = async (req, res, next) => {
  const { id } = req.params;
  try {
    deleteU = await PriorityHelper.deletePriority(id);
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
  createPriority: createPriority,
  updatePriority: updatePriority,
  deletePriority: deletePriority
};
