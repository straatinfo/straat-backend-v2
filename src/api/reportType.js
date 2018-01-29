const ErrorHelper = require('../helpers/error.helper');
const ReportTypeHelper = require('../helpers/reportType.helper');

// route: /
const getReportTypes = async (req, res, next) => {
  try {
    const getReportTypes = await ReportTypeHelper.getReportTypes();
    if (getReportTypes.err) {
      ErrorHelper.clientError(res, 400, getReportTypes.err);
      return;
    }
    res.status(200).send(getReportTypes.reportTypes);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

const createReportType = async (req, res, next) => {
  const { code, name, description } = req.body;
  try {
    const createdReportType = await ReportTypeHelper.createReportType(code, name, description);
    if (createdReportType.err) {
      ErrorHelper.clientError(res, 400, createdReportType.err);
      return;
    }
    res.status(200).send(createdReportType.reportType);
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

// route: /:id
const updateReportType = async (req, res, next) => {
  const { id } = req.params;
  const { code, name, description } = req.body;
  try {
    const updatedReportType = await ReportTypeHelper.updateReportType(id, code, name, description);
    if (updatedReportType.err) {
      ErrorHelper.clientError(res, 400, updatedReportType.err);
      return;
    }
    res.status(200).send(updatedReportType.reportType);
  }
  catch (e) {
    console.log(e);
    ErrorHelper.serverError(res);
  }
};

const deleteReportType = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedReportType = await ReportTypeHelper.deleteReportType(id);
    if (deletedReportType.err) {
      ErrorHelper.clientError(res, 400, deletedReportType.err);
      return;
    }
    res.status(200).send({affectedRows: deletedReportType.affectedRows});
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
}


module.exports = {
  getReportTypes: getReportTypes,
  createdReportType: createReportType,
  updateReportType: updateReportType,
  deleteReportType: deleteReportType
};
