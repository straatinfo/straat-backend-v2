const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const RegistrationHelper = require('../helpers/registration.helper');
const MailingHelper = require('../helpers/mailing.helper');
const UserHelper = require('../helpers/user.helper');

const requestForCode = async (req, res, next) => {
  try {
    const codeReq = await MailingHelper.sendRegistrationRequestNotif(req.body);
    if (codeReq.err) {
      return ErrorHelper.ClientError(res, {error: codeReq.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Successfully sent request'});
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const registerWithCode = async (req, res, next) => {
  const { code } = req.body;
  try {
    const getHost = await RegistrationHelper.getHostId(code);
    if (getHost.err) {
      return ErrorHelper.ClientError(res, {error: getHost.err}, 400);
    }
    const input = {
      ...req.body,
      '_host': getHost._host
    };
    const createU = await UserHelper.createNewUser(input);
    if (createU.err) {
      return ErrorHelper.ClientError(res, {error: createU.err}, 400);
    }
    const getU = await UserHelper.findUserById(createU.user._id);

    SuccessHelper.success(res, getU.user);
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  requestForCode: requestForCode,
  registerWithCode: registerWithCode
};
