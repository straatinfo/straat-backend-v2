const mailHelper = require('../../helpers/mailing.helper');
const internals = {};

internals.catchError = function (err, req, res) {
  console.log(err);
  res.status(500).send({
    status: 'ERROR',
    httpCode: 500,
    statusCode: 100,
    message: 'Internal Server Error'
  });
};

function validateParams (req, res, next) {
  var schema = {
    message: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Message'
      }
    },
    device: {
      isEmpty: {
        negated: true,
        errorMessage: 'Missing Parameter: Device Model'
      }
    }
  };

  req.checkBody(schema);
  const validationErrors = req.validationErrors();

  if (validationErrors) {
    const errorObject = lib.errorResponses.validationError(validationErrors);
    // req.logger.warn(errorObject, 'POST /api/hosts');
    return res.status(errorObject.httpCode).send(errorObject);
  } else {
    return next();
  }
}

function saveFeedback (req, res, next) {
  const user = req.user;
  const { device, message } = req.body;

  const newFeedback = new req.db.Feedback({
    _user: user._id,
    message: message,
    device: device
  });

  return newFeedback.save()
    .then(feedback => {
      req.$scope.feedback = feedback;

      next();
    })
    .catch(err => internals.catchError(err, req, res));
}

function sendFeedbackNotification (req, res, next) {
  const user = req.user;
  const { device, message } = req.body;

  return mailHelper.sendFeedBackNotifV2(user.username, user.email, message, device)
    .then(() => {
      return res.status(200).send({
        status: 'SUCCESS',
        httpCode: 200,
        statusCode: 0
      });
    })
    .catch(err => internals.catchError(err, req, res));
}

module.exports = {
  validateParams,
  saveFeedback,
  sendFeedbackNotification
};
