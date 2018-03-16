const SuccessHelper = require('../helpers/success.helper');
const ErrorHelper = require('../helpers/error.helper');
const MailingHelper = require('../helpers/mailing.helper');

const sendFeedBack = async (req, res, next) => {
  const { feedback, reporterName, reporterEmail } = req.body;
  try {
    const sendFB = await MailingHelper.sendFeedBackNotif(reporterName, reporterEmail, feedback);
    if (sendFB.err) {
      return ErrorHelper.ClientError(res, {error: sendFB.err}, 400);
    }
    SuccessHelper.success(res, {message: 'Successfully sent feedback'});
  }
  catch (e) {
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  sendFeedBack: sendFeedBack
};
