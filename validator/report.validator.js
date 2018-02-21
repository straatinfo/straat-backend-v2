const ErrorHelper = require('../helpers/error.helper');
const TeamHelper = require('../helpers/team.helper');
const HostHelper = require('../helpers/host.helper');
const ReportHelper = require('../helpers/report.helper');

const reportFormValidator = async (req, res, next) => {
  try {
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
    req.checkBody('_team', 'Team Cannot be empty').notEmpty();
    const errors = req.validationErrors();

    if (errors) {
      errors.forEach(function (error) {
        messages.push(error.msg);
      });
      return ErrorHelper.ClientError(res, messages, 400);
    }

    const checkHost = await HostHelper.getHostById(req.body._host);
    if (checkHost.err || !checkHost.host) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Host ID'}, 400);
    }

    const checkTeam = await TeamHelper.getTeamById(req.body._team);
    if (checkTeam.err || !checkTeam.team) {
      return ErrorHelper.ClientError(res, { error: 'Invalid Team ID'}, 400);
    }

    next();
  }
  catch (e) {
    ErrorHelper.ServerError(res);
  }
};

const updateReportFormValidator = (req, res, next) => {
  const messages = [];
  req.checkBody('note', 'Note Cannot be empty').notEmpty();
  req.checkBody('status', 'Status Cannot be empty').notEmpty();
  req.checkBody('causeOfFinished', 'Cause of finished cannot be empty').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    errors.forEach(function (error) {
      messages.push(error.msg);
    });
    return ErrorHelper.ClientError(res, messages, 400);
  }

  next();
};

const changeReportStatusFormValidator = async (req, res, next) => {
  try {
    const messages = [];
    req.checkBody('status', 'Status Cannot be empty').notEmpty();
    const checkReportId = await ReportHelper.getReportById(req.params.reportId);
    if (checkReportId.err) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Report ID'}, 400);
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
    console.log(e);
    ErrorHelper.ServerError(res);
  }
};

module.exports = {
  reportFormValidator: reportFormValidator,
  updateReportFormValidator: updateReportFormValidator,
  changeReportStatusFormValidator: changeReportStatusFormValidator
};
