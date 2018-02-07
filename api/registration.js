const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const RegistrationHelper = require('../helpers/registration.helper');
const MailingHelper = require('../helpers/mailing.helper');

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

module.exports = {
  requestForCode: requestForCode
};