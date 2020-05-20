const mongoose = require('mongoose');
const moment = require('moment');
const STATUS_LVL = {
  'NEW': 0,
  'INPROGRESS': 1,
  'DONE': 2,
  'EXPIRED': 2
};

async function _getReport (req) {
  const reportId = req.body.reportId || req.body.id;
  const query = mongoose.Types.ObjectId.isValid(reportId) ? { _id: reportId } : { generatedReportId : reportId };
  const report = await req.db.Report.findOne(query);
  req.$scope.report = report;
  return req;
}

async function _validateBody (req) {
  if (req.body.status) req.body.status = req.body.status.toUpperCase(); 
  let { status, note, isPublic } = req.body;
  const report = req.$scope.report;
  if (!status || (STATUS_LVL[report.status] >= STATUS_LVL[status])) {
    req.body.status = report.status;
  }

  if (typeof(isPublic) !== 'boolean') req.body.isPublic = report.isPublic || false;
  if (!note || note.trim().replace(' ', '') == '') req.body.note = report.note;
  return req;
}

async function _updateReport (req) {
  const reportId = req.body.reportId || req.body.id;
  const { status, note, isPublic } = req.body;
  let updateObj = { status, note, isPublic };
  if (status === 'DONE') {
    updateObj.finishedDate = moment.utc();
    updateObj.causeOfFinished = 'Updated by Admin';
  } else if (status === 'EXPIRED') {
    updateObj.finishedDate = moment.utc();
    updateObj.causeOfFinished = 'Expired';
  }
  const query = mongoose.Types.ObjectId.isValid(reportId) ? { _id: reportId } : { generatedReportId : reportId };
  const updatedReport = await req.db.Report.findOneAndUpdate(query, updateObj);
  req.$scope.report = updatedReport;

  return req;
}

module.exports = {
  _getReport,
  _validateBody,
  _updateReport
};
