const Report = require('../models/Report');
const MediaUpload = require('../models/MediaUpload');
const ReportTypeHelper = require('./reportType.helper');
const ReporterHelper = require('./reporter.helper');
const HostHelper = require('./host.helper');
const TeamHelper = require('./team.helper');
const CategoryHelper = require('./category.helper');
const ConversationHelper = require('./conversationV2.helper');
const Team = require('../models/Team');
const User = require('../models/User');
const _ = require('lodash'); 

const getReportDateRange = (date) => {
  return new Promise((resolve, reject) => {
    Report.find({
      $and: [
        { createdAt: { $gte: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() } },
        { createdAt: { $lte: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1) } }
      ]
    }, (err, reports) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, reports: reports})
    })
  })
}

const reportIdGenerator = (reportTypeId) => {
  // reportId format A20170924_00001
  return new Promise(async(resolve, reject) => {
    try {
      const getRT = await ReportTypeHelper.getReportTypeById(reportTypeId)
      if (getRT.err) {
        return resolve({err: getRT.err})
      }
      const date = new Date()
      const monthstr = '' + (date.getMonth() + 1)
      const monthPad = '00'
      const datestr = '' + date.getDate()
      const datePad = '00'
      const dateFormat = datePad.substring(0, datePad.length - datestr.length) + datestr
      const monthFormat = monthPad.substring(0, monthPad.length - monthstr.length) + monthstr
      const dateString = date.getFullYear() + '' + monthFormat + '' + dateFormat
      const getReport = await getReportDateRange(date)
      if (getReport.err) {
        return resolve({err: getReport.err})
      }
      const reportCount = getReport.reports.length + 1
      const str = '' + reportCount
      const pad = '00000'
      const countFormat = pad.substring(0, pad.length - str.length) + str
      const generatedReportId = getRT.reportType.code + dateString + '_' + countFormat
      resolve({err: null, generatedReportId: generatedReportId})
    } catch (e) {
      reject(e)
    }
  })
}

const getReports = () => {
  return new Promise((resolve, reject) => {
    Report.find()
    .populate('_reporter', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .populate('_team')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber', 'long', 'lat', 'email',
      'lname', 'fname', 'hostPersonalEmail'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .populate('attachments')
    .populate('_conversation')
    .sort([['createdAt', -1]])
    .exec((err, reports) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, reports: reports})
    })
  })
}

const getReportByHost = (hostId, _reportType = null) => {
  return new Promise((resolve, reject) => {
    Report.find({'_host': hostId, '_reportType': _reportType})
    .populate('_reporter', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .populate('_team')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber', 'long', 'lat', 'email',
      'lname', 'fname', 'hostPersonalEmail'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .populate('attachments')
    .populate('_conversation')
    .sort([['createdAt', -1]])
    .exec((err, reports) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, reports: reports})
    })
  })
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
    .populate('_team')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber', 'long', 'lat', 'email',
      'lname', 'fname', 'hostPersonalEmail'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .populate('attachments')
    .populate('_conversation')
    .exec((err, report) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, report: report})
    })
  })
}

const changeReportStatus = (_report, status = 'DONE') => {
  return new Promise((resolve, reject) => {
    Report.findByIdAndUpdate(_report, {'status': status}, async (err, report) => {
      try {
        if (err) {
          return resolve({err: err})
        }
        const getReport = await getReportById(report._id)
        if (getReport.err) {
          return resolve({err: getReport.err})
        }
        resolve({err: null, report: getReport.report})
      } catch (e) {
        reject(e)
      }
    })
  })
}

const getReportsByReportType = (reportTypeId) => {
  return new Promise((resolve, reject) => {
    Report.find({'_reportType': reportTypeId})
    .populate('_reporter', [
      '_id', 'fname', 'lname', 'email', 'gender',
      'username', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber'
    ])
    .populate('_team')
    .populate('_host', [
      '_id', 'hostName', 'houseNumber', 'streetName',
      'city', 'state', 'country', 'postalCode',
      'phoneNumber', 'long', 'lat', 'email',
      'lname', 'fname', 'hostPersonalEmail'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .populate('attachments')
    .populate('_conversation')
    .sort([['createdAt', -1]])
    .exec((err, reports) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, reports: reports})
    })
  })
}

const createReport = (input) => {
  return new Promise((resolve, reject) => {
    const newReport = new Report(input)
    newReport.save(async(err, report) => {
      try {
        if (err) {
          return resolve({err: err})
        }
        // update reporter
        const updateReporter = await ReporterHelper.updateReporterReports(report._reporter, report._id)
        // update host
        const updateHost = await HostHelper.updateHostReport(report._host, report._id)
        // update reportType
        const updateReportType = await ReportTypeHelper.updateReportTypeReport(report._reportType, report._id)
        // update mainCategory
        const updateMainCategory = await CategoryHelper.updateMainCategoryReport(report._mainCategory, report._id)
        // update team
        const updateTeam = await TeamHelper.updateTeamReport(report._team, report._id)
        // update subCategory
        if (report._subCategory) {
          const updateSubCategory = await CategoryHelper.updateSubCategoryReport(report._subCategory, report._id)
          if (updateSubCategory.err) {
            return resolve({err: 'Error on updating related schema'})
          }
        }
        if (updateReporter.err || updateHost.err || updateReportType.err || updateMainCategory.err || updateTeam.err) {
          return resolve({err: 'Error on updating related schema'})
        }
        // const getR = await getReportById(report._id)
        const createReportChat = await ConversationHelper.__createReportChat(report._reporter, report._team, report._id);
        const getR = await getReportByQueryObjectClean({_id: report._id})
        if (getR.err) {
          return resolve({err: getR.err})
        }
        return resolve({err: null, report: getR.reports[0]})
      } catch (e) {
        reject(e)
      }
    })
  })
}

const saveUploadedPhotoReport = (_report, input) => {
  return new Promise((resolve, reject) => {
    const newMediaUpload = new MediaUpload(input)
    newMediaUpload.save((err, mediaUpload) => {
      if (err) {
        return resolve({err: err})
      }
      Report.findByIdAndUpdate(_report,
      { '$addToSet': { 'attachments': mediaUpload._id } },
      { 'new': true, 'upsert': true },
      (err, report) => {
        if (err) {
          return resolve({err: err})
        }

        resolve({err: null, mediaUpload: mediaUpload})
      })
    })
  })
}

const saveUploadLooper = (_report, inputArray = [], saveUploadPromise = saveUploadedPhotoReport) => {
  return new Promise(async(resolve, reject) => {
    let error = [], success = []
    try {
      const process = await Promise.all(inputArray.map(async(input) => {
        try {
          const saveRP = await saveUploadPromise(_report, input)
          if (saveRP.err) {
            return error.push(saveRP.err)
          }
          success.push(saveRP.mediaUpload)
        } catch (e) {
          error.push(e)
        }
      }))
      resolve({error: error, success: success})
    } catch (e) {
      reject(e)
    }
  })
}

const updateReport = (_id, input) => {
  return new Promise((resolve, reject) => {
    Report.findByIdAndUpdate(_id, input, async(err, report) => {
      if (err) {
        return resolve({err: err})
      }
      try {
        const getR = await getReportById(report._id)
        if (getR.err) {
          return resolve({err: getR.err})
        }
        resolve({err: null, report: getR.report})
      } catch (e) {
        reject(e)
      }
    })
  })
}

const deleteReport = (_id) => {
  return new Promise((resolve, reject) => {
    Report.findByIdAndRemove(_id, (err, report) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, report: report})
    })
  })
}

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
      'phoneNumber', 'long', 'lat', 'email',
      'lname', 'fname', 'hostPersonalEmail'
    ])
    .populate('_reportType')
    .populate('_mainCategory')
    .populate('_subCategory')
    .populate('attachments')
    .sort([['date', -1]])
    .exec((err, reports) => {
      if (err) {
        return resolve({err: err})
      }
      resolve({err: null, reports: reports})
    })
  })
}

const filterExpired = (report, index) =>{

  if (report.status === 'INPROGRESS') {
    return true
  }
  if (report.status === 'NEW') {
    return true
  }
  if (report.status === 'INPROGRESS') {
    return true
  }
  // const present = new Date()
  // let afterDays = new Date(time)
  // afterDays.setDate(afterDays.getDate() + days)
  // return afterDays <= present

  // may be next time
}
// not include extra fields
// getReports
// isFilter , not include all expired and done + 1day in return obj : base on report Spec
const getReportByQueryObjectClean = (queryObject, isFilter = false, language='') => {
  return new Promise((resolve, reject) => {
    Report.find({...queryObject})
    .populate('_reportType', ['_id', 'code', 'name', 'description'])
    .populate('_reporter', ['_id', 'username', 'email'])
    .populate('_mainCategory', ['_id', 'name', 'description'])
    .populate('_subCategory', ['_id', 'name', 'description'])
    .populate('_host', ['_id', 'hostName', 'email'])
    .populate('_team', ['_id', 'teamName', 'email'])
    .populate({
      path: '_conversation',
      select: { messages: {$slice: -1}, _id: true}
    })
    .populate('attachments', ['_id', 'secure_url'])
    .sort([['createdAt', -1]])
    .exec(async(err, reports) => {
      if (err) {
        return resolve({err: err})
      }
      if (isFilter) { 
      //  return resolve({err: null, reports: reports.filter(filterExpired)})
      }

      return resolve({err: null, reports: reports})
    })
  })
}

const flatReport = (r) => {
  return new Promise((resolve, reject) => {
    const flatReport = {
      _id: r._id || null,
      generatedReportId: r.generatedReportId || null,
      updatedAt: r.updatedAt || null,
      createdAt: r.createdAt || null,
      finishedDate: r.finishedDate || null,
      causeOfFinished: r.causeOfFinished || null,
      '_team._id': (r._team && r._team._id) ? r._team._id : null,
      '_team.teamName': (r._team && r._team.teamName) ? r._team.teamName : null,
      '_team.teamEmail': (r._team && r._team.teamEmail) ? r._team.teamEmail : null,
      '_reportType._id': (r._reportType && r._reportType._id) ? r._reportType._id : null,
      '_reportType.code': (r._reportType && r._reportType.code) ? r._reportType.code : null,
      '_reportType.name': (r._reportType && r._reportType.name) ? r._reportType.name : null,
      '_reportType.description': (r._reportType && r._reportType.description) ? r._reportType.description : null,
      '_reporter._id': (r._reporter && r._reporter._id) ? r._reporter.id : null,
      '_reporter.fname': (r._reporter && r._reporter.fname) ? r._reporter.fname : null,
      '_reporter.lname': (r._reporter && r._reporter.lname) ? r._reporter.lname : null,
      '_reporter.username': (r._reporter && r._reporter.username) ? r._reporter.username : null,
      title: r.title || null,
      description: r.description || null,
      long: r.long || null,
      lat: r.lat || null,
      location: r.location || null,
      '_host._id': (r._host && r._host._id) ? r._host._id : null,
      '_host.hostName': (r._host && r._host.hostName) ? r._host.hostName : null,
      '_host.postalcode': (r._host && r._host.postalCode) ? r._host.postalCode : null,
      '_host.houseNumber': (r._host && r._host.houseNumber) ? r._host.houseNumber : null,
      '_host.streetName': (r._host && r._host.streetName) ? r._host.streetName : null,
      '_host.city': (r._host && r._host.city) ? r._host.city : null,
      '_host.state': (r._host && r._host.state) ? r._host.state : null,
      '_host.country': (r._host && r._host.country) ? r._host.country : null,
      '_host.lat': (r._host && r._host.lat) ? r._host.lat : null,
      '_host.long': (r._host && r._host.long) ? r._host.long : null,
      '_host.lname': (r._host && r._host.lname) ? r._host.lname : null,
      '_host.fname': (r._host && r._host.hostPersonalEmail) ? r._host.hostPersonalEmail : null,
      '_host.hostPersonalEmail': (r._host && r._host.hostPersonalEmail) ? r._host.hostPersonalEmail : null,
      '_host.email': (r._host && r._host.email) ? r._host.email : null,
      '_host.phoneNumber': (r._host && r._host.phoneNumber) ? r._host.phoneNumber : null,
      '_mainCategory._id': (r._mainCategory && r._mainCategory._id) ? r._mainCategory._id : null,
      '_mainCategory._reportType': (r._mainCategory && r._mainCategory._reportType) ? r._mainCategory._reportType : null,
      '_mainCategory.name': (r._mainCategory && r._mainCategory.name) ? r._mainCategory.name : null,
      '_subCategory._id': (r._subCategory && r._subCategory._id) ? r._subCategory._id : null,
      '_subCategory._mainCategory': (r._subCategory && r._subCategory._mainCategory) ? r._subCategory._mainCategory : null,
      '_subCategory.name': (r._subCategory && r._subCategory.name) ? r._subCategory.name : null,
      '_team._id': (r._team && r._team._id) ? r._team._id : null,
      '_team.teamName': (r._team && r._team.teamName) ? r._team.teamName : null,
      '_team.teamEmail': (r._team && r._team.teamEmail) ? r._team.teamEmail : null,
      '_conversation._id': (r._conversation && r._conversation._id) ? r._conversation._id : null,
      isPeopleInvolved: r.isPeopleInvolved || null,
      isVehicleInvolved: r.isVehicleInvolved || null,
      isUrgent: r.isUrgent || null,
      note: r.note || null,
      status: r.status || null,
      peopleInvolvedCount: r.peopleInvolvedCount || null,
      vehicleInvolvedDescription: r.vehicleInvolvedDescription || null,
      attachments: r.attachments || []
    }

    resolve({err: null, report: flatReport})
  })
}

const getReportAttachments = (_report) => {
  return new Promise((resolve, reject) => {
    Report.findById(_report)
    .populate('attachments')
    .exec((err, report) => {
      if (err) { return resolve({err: err}) }
      const attachments = report.attachments
      resolve({err: null, attachments: attachments})
    })
  })
};

// use by notification in app
const getPublicReports = async (_reporter, _reportType = null) => {
  try {
    // get teams
    const { teamMembers, teamLeaders, _host } = await User.findById(_reporter).populate('teamMembers').populate('teamLeaders')

    const teamLeadersList = teamLeaders.map(tm => tm._team.toString()) 
    const teamMembersList = teamMembers.map(tm => tm._team.toString())

    const teamList =_.union(teamLeadersList, teamMembersList)
    const extendParam = _reportType ? {_reportType: _reportType} : {}

    const publicReports = {
      $and: [
        {_host: _host, ...extendParam},
         {'$or': [{isPublic: true}, {_team: {$in: teamList}}]}
      ]
    }
    const reports = await getReportByQueryObjectClean(publicReports)
    return Promise.resolve(reports)
  }
  catch (e) {
    return Promise.reject(e)
  }
}

module.exports = {
  reportIdGenerator: reportIdGenerator,
  getReports: getReports,
  getReportById,
  createReport: createReport,
  updateReport: updateReport,
  deleteReport: deleteReport,
  getReportByHost: getReportByHost,
  getReportsByReportType: getReportsByReportType,
  saveUploadedPhotoReport: saveUploadedPhotoReport,
  saveUploadLooper: saveUploadLooper,
  getReportByQueryObject: getReportByQueryObject,
  flatReport: flatReport,
  changeReportStatus: changeReportStatus,
  getReportAttachments: getReportAttachments,
  getReportByQueryObjectClean,
  getPublicReports
}
