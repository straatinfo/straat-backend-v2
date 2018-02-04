const Report = require('../models/Report');
const ReportTypeHelper = require('./reportType.helper');


const getReportDateRange = (date) => {
  return new Promise((resolve, reject) => {
    Report.find({
      $and: [
        { createdAt: { [Op.gte]: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() } },
        { createdAt: { [Op.lte]: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1) } }
      ]
    }, (err, reports) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reports: reports});
    });
  });
};


const reportIdGenerator = (reportTypeId) => {
  // reportId format A20170924_00001
  return new Promise(async(resolve, reject) => {
    try {
      const getRT = await ReportTypeHelper.getReportTypeById(reportTypeId);
      if (getRT.err) {
        return resolve({err: getRT.err});
      }
      const date = new Date();
      const monthstr = "" + (date.getMonth() + 1);
      const monthPad = "00";
      const monthFormat = monthPad.substring(0, monthPad.length - monthstr.length) + monthstr;
      const dateString = date.getFullYear() + '' + monthFormat + '' + date.getDate();
      const getReport = await getReportDateRange(date);
      if (getReport.err) {
        return resolve({err: getReport.err});
      }
      const reportCount = getReport.reports.length + 1;
      const str = "" + reportCount;
      const pad = "00000"
      const countFormat = pad.substring(0, pad.length - str.length) + str;
      const generatedReportId = getRT.reportType.code + dateString + '_' + countFormat;
      resolve({err: null, generatedReportId: generatedReportId});
    }
    catch (e) {
      reject(e);
    }
  });
};

const getReports = () => {
  return new Promise((resolve, reject) => {
    Report.find()
    .populate('_reporter', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber', 'long', 'lat'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .sort([['date', -1]])
    .exec((err, reports) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reports: reports});
    });
  });
};

const getReportByHost = (hostId) => {
  return new Promise((resolve, reject) => {
    Report.find({'_host': hostId})
    .populate('_reporter', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber', 'long', 'lat'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .sort([['date', -1]])
    .exec((err, reports) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reports: reports});
    });
  });
}

const getReportById = (_id) => {
  return new Promise((resolve, reject) => {
    Report.findById(_id)
    .populate('_reporter', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber', 'long', 'lat'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .exec((err, report) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, report: report});
    });
  });
};

const getReportsByReportType = (reportTypeId) => {
  return new Promise((resolve, reject) => {
    Report.find({'_reportType': reportTypeId})
    .populate('_reporter', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber', 'long', 'lat'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .sort([['date', -1]])
    .exec((err, reports) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reports: reports});
    });
  });
};



const createReport = (input) => {
  return new Promise(async(resolve, reject) => {
    const newReport = new Report(input);
    newReport.save((err, report) => {
      if (err) {
        return resolve({err: err});
      }
      try {
        const getR = await getReportById(report._id);
        if (getR.err) {
          return resolve({err: getR.err});
        }
        resolve({err: null, report: getR.report});
      }
      catch (e) {
        reject(e);
      }
    });
  });
}

const updateReport = (_id, input) => {
  return new Promise(async(resolve, reject) => {
    Report.findByIdAndUpdate(_id, input, (err, report) => {
      if (err) {
        return resolve({err: err});
      }
      try {
        const getR = await getReportById(report._id);
        if (getR.err) {
          return resolve({err: getR.err});
        }
        resolve({err: null, report: getR.report});
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

const deleteReport = (_id) => {
  return new Promise((resolve, reject) => {
    Report.findByIdAndRemove(_id, (err, report) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, report: report});
    });
  });
};

module.exports = {
  reportIdGenerator: reportIdGenerator,
  getReports: getReports,
  getReportById, getReportById,
  createReport: createReport,
  updateReport: updateReport,
  deleteReport: deleteReport,
  getReportByHost: getReportByHost,
  getReportsByReportType: getReportsByReportType
};

