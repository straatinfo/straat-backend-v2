const ErrorHelper = require('../helpers/error.helper');
const TeamHelper = require('../helpers/team.helper');
const HostHelper = require('../helpers/host.helper');
const ReportHelper = require('../helpers/report.helper');
const ReportTypeHelper = require('../helpers/reportType.helper');

const reportFormValidator = async (req, res, next) => {
//

// here must be validate all required fields
 

//
  try {
    const messages = [];
    req.checkBody('_reportType', 'Report Type Cannot be empty').notEmpty();

    const checkReportType = await ReportTypeHelper.getReportTypeById(req.body._reportType); // this is wrong; so big response
    if (checkReportType.err || !checkReportType.reportType) {
      return ErrorHelper.ClientError(res, {error: 'Invalid Report Type'}, 400);
    }
    const { code } = checkReportType.reportType;
    req.reportTypeCode = code;
    if (code.toUpperCase() === 'A') {
      req.checkBody('title', 'Title cannot be empty').notEmpty();
      // not required in spec
      // req.checkBody('description', 'Description cannot be empty').notEmpty();
      req.checkBody('location', 'Location cannot be empty').notEmpty();
      req.checkBody('long', 'Longitude cannot be empty').notEmpty();
      req.checkBody('lat', 'Latitude cannot be empty').notEmpty();
      req.checkBody('_reporter', 'Reporter cannot be empty').notEmpty();
      req.checkBody('_host', 'Host cannot be empty').notEmpty();
      req.checkBody('_mainCategory', 'Main Category cannot be empty').notEmpty();
      // only required if it has subcategory
      // req.checkBody('_subCategory', 'SubCategory cannot be empty').notEmpty();
      req.checkBody('isUrgent', 'Is Urgent cannot be empty').notEmpty();

      // not be required
      // req.checkBody('_team', 'Team Cannot be empty').notEmpty();
      if (req.body._team) {
        const checkTeam = await TeamHelper.getTeamById(req.body._team);
        if (checkTeam.err || !checkTeam.team) {
          return ErrorHelper.ClientError(res, { error: 'Invalid Team ID'}, 400);
        }
      }
    }
    if (code.toUpperCase() === 'B') {
      req.checkBody('title', 'Title cannot be empty').notEmpty();
      // not required in spec
      // req.checkBody('description', 'Description cannot be empty').notEmpty();
      req.checkBody('location', 'Location cannot be empty').notEmpty();
      req.checkBody('long', 'Longitude cannot be empty').notEmpty();
      req.checkBody('lat', 'Latitude cannot be empty').notEmpty();
      req.checkBody('_reporter', 'Reporter cannot be empty').notEmpty();
      req.checkBody('_host', 'Host cannot be empty').notEmpty();
      req.checkBody('_mainCategory', 'Main Category cannot be empty').notEmpty();
      req.checkBody('isUrgent', 'Is Urgent cannot be empty').notEmpty();
      // req.checkBody('_team', 'Team Cannot be empty').notEmpty();
      if (req.body._team) {
        const checkTeam = await TeamHelper.getTeamById(req.body._team);
        if (checkTeam.err || !checkTeam.team) {
          return ErrorHelper.ClientError(res, { error: 'Invalid Team ID'}, 400);
        }
      }
    }
    if (code.toUpperCase() === 'C') {
      req.checkBody('title', 'Title cannot be empty').notEmpty();
      // not required in spec
      // req.checkBody('description', 'Description cannot be empty').notEmpty();
      req.checkBody('_reporter', 'Reporter cannot be empty').notEmpty();
      req.checkBody('_host', 'Host cannot be empty').notEmpty();
      // only required if it has
      // req.checkBody('_mainCategory', 'Main Category cannot be empty').notEmpty();
      req.checkBody('teamList', 'Team List cannot be empty').notEmpty();
      if (!req.body.teamList || req.body.teamList.length === 0) {
        return ErrorHelper.ClientError(res, {error: 'Team List Array is empty'}, 400);
      }
    }
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

    next();
  }
  catch (e) {
    // console.log(e)
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


const changeIsPublicFormValidator = async (req, res, next) => {
  try {
    const messages = [];
    req.checkBody('isPublic', 'isPublic Cannot be empty').notEmpty();
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
  changeReportStatusFormValidator: changeReportStatusFormValidator,
  changeIsPublicFormValidator
};
