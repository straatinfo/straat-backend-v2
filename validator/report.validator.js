const ErrorHelper = require('../helpers/error.helper');

const reportFormValidator = async (req, res, next) => {
  const messages = [];

  req.checkBody('title', 'Title cannot be empty').notEmpty();
  req.checkBody('description', 'Description cannot be empty').notEmpty();
  req.checkBody('location', 'Location cannot be empty').notEmpty();
  req.checkBody('long', 'Longitude cannot be empty').notEmpty();
  req.checkBody('lat', 'Latitude cannot be empty').notEmpty();
  req.checkBody('_reporter', 'Reporter cannot be empty').notEmpty();
  req.checkBody('_host', 'Host cannot be empty').notEmpty();
  req.checkBody('_mainCategory', 'Main Category cannot be empty').notEmpty();
  req.checkBody('_reportType', 'Report Type Cannot be empty').notEmpty();
  // req.checkBody('_subCategory', 'SubCategory cannot be empty').notEmpty();
  req.checkBody('isUrgent', 'Is Urgent cannot be empty').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    errors.forEach(function (error) {
      messages.push(error.msg);
    });
    return ErrorHelper.ClientError(res, messages, 400);
  }

  next();
};

const updateReportFormValidator = (req, res, next) => {
  const messages = [];
  req.checkBody('note', 'Note Cannot be empty').notEmpty();
  req.checkBody('status', 'Status Cannot be empty').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    errors.forEach(function (error) {
      messages.push(error.msg);
    });
    return ErrorHelper.ClientError(res, messages, 400);
  }

  next();
};

module.exports = {
  reportFormValidator: reportFormValidator,
  updateReportFormValidator: updateReportFormValidator
};
