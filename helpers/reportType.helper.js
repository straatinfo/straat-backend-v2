const ReportType = require('../models/ReportType');

const getReportTypes = () => {
  return new Promise((resolve, reject) => {
    ReportType.find((err, reportTypes) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reportTypes: reportTypes});
    });
  });
};

const getReportTypeById = (_id) => {
  return new Promise((resolve, reject) => {
    ReportType.findById(_id, (err, reportType) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reportType: reportType});
    });
  });
};

const createReportType = (input) => {
  return new Promise((resolve, reject) => {
    const reportTypeSchema = new ReportType(input);
    reportTypeSchema
    .save((err, reportType) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reportType: reportType});
    });
  });
};

const updateReportType = (_id, input) => {
  return new Promise((resolve, reject) => {
    ReportType.findByIdAndUpdate(_id, input, (err, reportType) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reportType: reportType});
    });
  });
};

const deleteReportType = (_id) => {
  return new Promise((resolve, reject) => {
    ReportType.findByIdAndRemove(_id, (err, reportType) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reportType: reportType});
    });
  });
};

module.exports = {
  getReportTypes: getReportTypes,
  createReportType: createReportType,
  updateReportType: updateReportType,
  deleteReportType: deleteReportType,
  getReportTypeById: getReportTypeById
};
