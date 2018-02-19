const Report = require('../models/Report');
const ReportPhoto = require('../models/ReportPhoto');
const ReportTypeHelper = require('./reportType.helper');
const ReporterHelper = require('./reporter.helper');
const HostHelper = require('./host.helper');
const TeamHelper = require('./team.helper');
const CategoryHelper = require('./category.helper');


const getReportDateRange = (date) => {
  return new Promise((resolve, reject) => {
    Report.find({
      $and: [
        { createdAt: { $gte: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() } },
        { createdAt: { $lte: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1) } }
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
      const datestr = "" + date.getDate();
      const datePad = "00";
      const dateFormat = datePad.substring(0, datePad.length - datestr.length) + datestr;
      const monthFormat = monthPad.substring(0, monthPad.length - monthstr.length) + monthstr;
      const dateString = date.getFullYear() + '' + monthFormat + '' + dateFormat;
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
      'phoneNumber', 'long', 'lat', 'email'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .populate('reportPhotos')
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
      'phoneNumber', 'long', 'lat', 'email'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .populate('reportPhotos')
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
      'phoneNumber', 'long', 'lat', 'email'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .populate('reportPhotos')
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
      'phoneNumber', 'long', 'lat', 'email'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .populate('reportPhotos')
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
  return new Promise((resolve, reject) => {
    const newReport = new Report(input);
    newReport.save(async(err, report) => {
      try {
        if (err) {
          return resolve({err: err});
        }
        // update reporter
        const updateReporter = await ReporterHelper.updateReporterReports(report._reporter, report._id);
        // update host
        const updateHost = await HostHelper.updateHostReport(report._host, report._id);
        // update reportType
        const updateReportType = await ReportTypeHelper.updateReportTypeReport(report._reportType, report._id);
        // update mainCategory
        const updateMainCategory = await CategoryHelper.updateMainCategoryReport(report._mainCategory, report._id);
        // update team
        const updateTeam = await TeamHelper.updateTeamReport(report._team, report._id);
        // update subCategory
        if (report._subCategory) {
          const updateSubCategory = await CategoryHelper.updateSubCategoryReport(report._subCategory, report._id);
          if (updateSubCategory.err) {
            return resolve({err: 'Error on updating related schema'});
          }
        }
        if (updateReporter.err || updateHost.err || updateReportType.err || updateMainCategory.err || updateTeam.err) {
          return resolve({err: 'Error on updating related schema'});
        }
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

const saveUploadedPhotoReport = (_report, input) => {
  return new Promise((resolve, reject) => {
    const newReportPhoto = new ReportPhoto({...input, '_report': _report});
    newReportPhoto.save((err, reportPhoto) => {
      if (err) {
        return resolve({err: err});
      }
      Report.findByIdAndUpdate(_report,
      { '$addToSet': { 'reportPhotos': reportPhoto._id } },
      { 'new': true, 'upsert': true },
      (err, report) => {
        if (err) {
          return resolve({err: err});
        }

        resolve({err: null, reportPhoto: reportPhoto});
      });
    });
  });
};

const saveUploadLooper = (_report, inputArray = [], saveUploadPromise = saveUploadedPhotoReport) => {
  return new Promise(async(resolve, reject) => {
    let error = [], success = [];
    try {
      const process = await Promise.all(inputArray.map(async(input) => {
        try {
          const saveRP = await saveUploadPromise(_report, input);
          if (saveRP.err) {
            return error.push(saveRP.err);
          }
          success.push(saveRP.reportPhoto);
        }
        catch (e) {
          error.push(e);
        }
      }));
      resolve({error: error, success: success});
    }
    catch (e) {
      reject(e);
    }
  });
};

const updateReport = (_id, input) => {
  return new Promise((resolve, reject) => {
    Report.findByIdAndUpdate(_id, input, async(err, report) => {
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

const getReportByQueryObject = (queryObject) => {
  return new Promise((resolve, reject) => {
    Report.find(queryObject)
    .populate('_reporter', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber', 'long', 'lat', 'email'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .populate('reportPhotos')
    .sort([['date', -1]])
    .exec((err, reports) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, reports: reports});
    });
  });
};

const flatReport = (report) => {
  return new Promise((resolve, reject) => {
    let flatReport;
    if (report._subCategory && report._reporter && report.generatedReportId) {
      flatReport = {
        _id: report._id,
        generatedReportId: report.generatedReportId,
        updatedAt: report.updatedAt,
        createdAt: report.createdAt,
        finishedDate: report.finishedDate,
        causeOfFinished: report.causeOfFinished,
        '_team._id': report._team._id,
        '_team.teamName': report._team.teamName,
        '_team.teamEmail': report._team.teamEmail,
        '_reportType._id': report._reportType._id,
        '_reportType.code': report._reportType.code,
        '_reportType.name': report._reportType.name,
        '_reportType.description': report._reportType.description,
        '_reporter._id': report._reporter.id,
        '_reporter.fname': report._reporter.fname,
        '_reporter.lname': report._reporter.lname,
        title: report.title,
        description: report.description,
        long: report.long,
        lat: report.lat,
        location: report.location,
        '_host._id': report._host._id,
        '_host.hostName': report._host.hostName,
        '_host.postalcode': report._host.postalCode,
        '_host.houseNumber': report._host.houseNumber,
        '_host.streetName': report._host.streetName,
        '_host.city': report._host.city,
        '_host.state': report._host.state,
        '_host.country': report._host.country,
        '_host.lat': report._host.lat,
        '_host.long': report._host.long,
        '_host.email': report._host.email,
        '_host.phoneNumber': report._host.phoneNumber,
        '_mainCategory._id': report._mainCategory._id,
        '_mainCategory._reportType': report._mainCategory._reportType,
        '_mainCategory.name': report._mainCategory.name,
        '_subCategory._id': report._subCategory._id,
        '_subCategory._mainCategory': report._subCategory._mainCategory || null,
        '_subCategory.name': report._subCategory.name,
        isPeopleInvolved: report.isPeopleInvolved,
        isVehicleInvolved: report.isVehicleInvolved,
        isUrgent: report.isUrgent,
        note: report.note,
        status: report.status,
        peopleInvolvedCount: report.peopleInvolvedCount,
        vehicleInvolvedDescription: report.vehicleInvolvedDescription,
        reportPhotos: report.reportPhotos
      };
    } else if (report._reporter && report.generatedReportId) {
      flatReport = {
        _id: report._id,
        generatedReportId: report.generatedReportId,
        updatedAt: report.updatedAt,
        createdAt: report.createdAt,
        finishedDate: report.finishedDate,
        causeOfFinished: report.causeOfFinished,
        '_team._id': report._team._id,
        '_team.teamName': report._team.teamName,
        '_team.teamEmail': report._team.teamEmail,
        '_reporter._id': report._reporter.id,
        '_reporter.fname': report._reporter.fname,
        '_reporter.lname': report._reporter.lname,
        '_reportType._id': report._reportType._id,
        '_reportType.code': report._reportType.code,
        '_reportType.name': report._reportType.name,
        '_reportType.description': report._reportType.description,
        title: report.title,
        description: report.description,
        long: report.long,
        lat: report.lat,
        location: report.location,
        '_host._id': report._host._id,
        '_host.hostName': report._host.hostName,
        '_host.postalcode': report._host.postalCode,
        '_host.houseNumber': report._host.houseNumber,
        '_host.streetName': report._host.streetName,
        '_host.city': report._host.city,
        '_host.state': report._host.state,
        '_host.country': report._host.country,
        '_host.lat': report._host.lat,
        '_host.long': report._host.long,
        '_host.email': report._host.email,
        '_host.phoneNumber': report._host.phoneNumber,
        '_mainCategory._id': report._mainCategory._id,
        '_mainCategory._reportType': report._mainCategory._reportType,
        '_mainCategory.name': report._mainCategory.name,
        '_subCategory._id': null,
        '_subCategory._mainCategory': null,
        '_subCategory.name': null,
        isPeopleInvolved: report.isPeopleInvolved,
        isVehicleInvolved: report.isVehicleInvolved,
        isUrgent: report.isUrgent,
        note: report.note,
        status: report.status,
        peopleInvolvedCount: report.peopleInvolvedCount,
        vehicleInvolvedDescription: report.vehicleInvolvedDescription,
        reportPhotos: report.reportPhotos
      }
    } else if (report.generatedReportId) {
      flatReport = {
        _id: report._id,
        generatedReportId: report.generatedReportId,
        updatedAt: report.updatedAt,
        createdAt: report.createdAt,
        finishedDate: report.finishedDate,
        causeOfFinished: report.causeOfFinished,
        '_team._id': report._team._id,
        '_team.teamName': report._team.teamName,
        '_team.teamEmail': report._team.teamEmail,
        '_reporter._id': null,
        '_reporter.fname': null,
        '_reporter.lname': null,
        '_reportType._id': report._reportType._id,
        '_reportType.code': report._reportType.code,
        '_reportType.name': report._reportType.name,
        '_reportType.description': report._reportType.description,
        title: report.title,
        description: report.description,
        long: report.long,
        lat: report.lat,
        location: report.location,
        '_host._id': report._host._id,
        '_host.hostName': report._host.hostName,
        '_host.postalcode': report._host.postalCode,
        '_host.houseNumber': report._host.houseNumber,
        '_host.streetName': report._host.streetName,
        '_host.city': report._host.city,
        '_host.state': report._host.state,
        '_host.country': report._host.country,
        '_host.lat': report._host.lat,
        '_host.long': report._host.long,
        '_host.phoneNumber': report._host.phoneNumber,
        '_host.email': report._host.email,
        '_mainCategory._id': report._mainCategory._id,
        '_mainCategory._reportType': report._mainCategory._reportType,
        '_mainCategory.name': report._mainCategory.name,
        '_subCategory._id': null,
        '_subCategory._mainCategory': null,
        '_subCategory.name': null,
        isPeopleInvolved: report.isPeopleInvolved,
        isVehicleInvolved: report.isVehicleInvolved,
        isUrgent: report.isUrgent,
        note: report.note,
        status: report.status,
        peopleInvolvedCount: report.peopleInvolvedCount,
        vehicleInvolvedDescription: report.vehicleInvolvedDescription,
        reportPhotos: report.reportPhotos
      }
    } else {
      flatReport = {
        _id: report._id,
        generatedReportId: null,
        updatedAt: report.updatedAt,
        createdAt: report.createdAt,
        '_reporter._id': null,
        '_reporter.fname': null,
        '_reporter.lname': null,
        '_reportType._id': report._reportType._id,
        '_reportType.code': report._reportType.code,
        '_reportType.name': report._reportType.name,
        '_reportType.description': report._reportType.description,
        title: report.title,
        description: report.description,
        long: report.long,
        lat: report.lat,
        location: report.location,
        '_host._id': report._host._id,
        '_host.hostName': report._host.hostName,
        '_host.postalcode': report._host.postalCode,
        '_host.houseNumber': report._host.houseNumber,
        '_host.streetName': report._host.streetName,
        '_host.city': report._host.city,
        '_host.state': report._host.state,
        '_host.country': report._host.country,
        '_host.lat': report._host.lat,
        '_host.long': report._host.long,
        '_host.email': report._host.email,
        '_host.phoneNumber': report._host.phoneNumber,
        '_mainCategory._id': report._mainCategory._id,
        '_mainCategory._reportType': report._mainCategory._reportType,
        '_mainCategory.name': report._mainCategory.name,
        '_subCategory._id': null,
        '_subCategory._mainCategory': null,
        '_subCategory.name': null,
        isPeopleInvolved: report.isPeopleInvolved,
        isVehicleInvolved: report.isVehicleInvolved,
        isUrgent: report.isUrgent,
        note: report.note,
        status: report.status,
        peopleInvolvedCount: report.peopleInvolvedCount,
        vehicleInvolvedDescription: report.vehicleInvolvedDescription,
        reportPhotos: report.reportPhotos
      }
    }
    resolve({err: null, report: flatReport});
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
  getReportsByReportType: getReportsByReportType,
  saveUploadedPhotoReport: saveUploadedPhotoReport,
  saveUploadLooper: saveUploadLooper,
  getReportByQueryObject: getReportByQueryObject,
  flatReport: flatReport
};
