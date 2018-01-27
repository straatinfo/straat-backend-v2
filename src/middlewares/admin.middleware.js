const db = require('../models');
const ErrorHelper = require('../helpers/error.helper');

const checkIfAdmin = (req, res, next) => {
  try {
    if (!req.user || !req.user.roleId || req.user.roleId !== 1) {
      ErrorHelper.clientError(res, 400, 'Unauthorized');
      return;
    }
    next();
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

module.exports = {
  checkIfAdmin: checkIfAdmin
};
