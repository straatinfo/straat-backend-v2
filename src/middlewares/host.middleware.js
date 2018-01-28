const db = require('../models');
const ErrorHelper = require('../helpers/error.helper');

const checkIfHost = (req, res, next) => {
  try {
    if (!req.user || !req.user.roleId || req.user.roleId !== 2) {
      ErrorHelper.clientError(res, 400, 'Unauthorized');
      return;
    }
    next();
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const checkIfLowerThanHost = (req, res, next) => {
  try {
    if (!req.user || !req.user.roleId || req.user.roleId > 2) {
      ErrorHelper.clientError(res, 400, 'Unauthorized');
      return;
    }
    next();
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
}

module.exports = {
  checkIfHost: checkIfHost,
  checkIfLowerThanHost: checkIfLowerThanHost
};
