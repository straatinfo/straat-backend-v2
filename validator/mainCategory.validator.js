const ErrorHelper = require('../helpers/error.helper');
const HostHelper = require('../helpers/host.helper');

const mainCategoryFormValidator = async (req, res, next) => {
  try {
    const messages = [];

    req.checkBody('name', 'Name cannot be empty').notEmpty();
    const checkHost = await HostHelper.getHostById(req.params.hostId);
    if (checkHost.err) {
      return ErrorHelper.ClientError(res, {error: checkHost.err}, 400);
    }
    if (!checkHost.host) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Host ID'}, 400);
    }
    
    const errors = req.validationErrors();

    if (errors) {
      errors.forEach(function (error) {
        messages.push(error.msg);
      });
      return ErrorHelper.ClientError(res, messages, 400);
    }

    next();
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  mainCategoryFormValidator: mainCategoryFormValidator
};

