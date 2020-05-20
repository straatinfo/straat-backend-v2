const mongoose = require('mongoose');

async function _validateParams (req) {
  const { hostId, reportTypeCode } = req.body;
  let error = {
    status: 'ERROR',
    statusCode: 102,
    httpCode: 400,
    message: 'Invalid Parameter: Host ID'
  };

  if (!mongoose.isValidObjectId(hostId)) {
    throw error;
  }

  const host = await req.db.Host.findById(hostId);
  if (!host) {
    throw error;
  }

  const reportType = await req.db.ReportType.findOne({ code: reportTypeCode.toUpperCase() });
  if (!reportType) {
    error.message = 'Invalid Parameter: Report Type Code';
    throw error;
  }

  req.$scope.host = host;
  req.$scope.reportType = reportType;

  return req;
}

async function _createMainCategory (req) {
  const { hostId, name, dutchName, description } = req.body;
  const oldMainCategory = await req.db.MainCategory.findOne({
    _host: hostId,
    name: name,
    _reportType: req.$scope.reportType._id
  });

  let newMainCategory;

  if (oldMainCategory) {
    newMainCategory = await req.db.MainCategory.findByIdAndUpdate(oldMainCategory._id, {
      translations: [
        { code: 'en', word: name },
        { code: 'nl', word: dutchName }
      ]
    });
  } else {
    newMainCategory = await req.db.MainCategory.create({
      _host: hostId,
      name: name,
      _reportType: req.$scope.reportType._id,
      description: description,
      translations: [
        { code: 'en', word: name },
        { code: 'nl', word: dutchName }
      ]
    });
  }

  req.$scope.mainCategory = newMainCategory;
  return req;
}

async function _deleteMainCategory (req) {
  const { id } = req.body;
  let error = {
    status: 'ERROR',
    statusCode: 102,
    httpCode: 400,
    message: 'Invalid Parameter: Main Category ID'
  };
  if (!mongoose.isValidObjectId(id)) {
    throw error;
  }
  
  const checkIfHasReports = await req.db.Report.findOne({ _mainCategory: id });
  let deletedMC;
  if (checkIfHasReports) {
    deletedMC = await req.db.MainCategory.findByIdAndUpdate(id, { softRemoved: true });
  } else {
    deletedMC = await req.db.MainCategory.findByIdAndRemove(id);
    await req.db.SubCategory.remove({ _mainCategory: id });
  }

  req.mainCategory = deletedMC;
  return req;
}

module.exports = {
  _validateParams,
  _createMainCategory,
  _deleteMainCategory
};
