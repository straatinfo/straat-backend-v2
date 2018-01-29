const db = require('../models');
const Op = require('sequelize').Op;
const reportIdGenerator = (reportTypeId) => {
  // reportId format A20170924_00001
  return new Promise(async(resolve, reject) => {
    try {
      const reportType = await db.reportType.findOne({where: {id: reportTypeId}});
      if (!reportType) {
        resolve({err: 'Invalid report Type ID'});
        return;
      }
      const date = new Date();
      const monthstr = "" + (date.getMonth() + 1);
      const monthPad = "00";
      const monthFormat = monthPad.substring(0, monthPad.length - monthstr.length) + monthstr;
      console.log(monthFormat);
      const dateString = date.getFullYear() + '' + monthFormat + '' + date.getDate();
      const reports = await db.report.findAll({
        where: {
          [Op.and]: [
            { createdAt: { [Op.gte]: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) } },
            { createdAt: { [Op.lte]: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1) } }
          ]
        }
      });
      const reportCount = reports.length + 1;
      const str = "" + reportCount;
      const pad = "00000"
      const countFormat = pad.substring(0, pad.length - str.length) + str;
      const generatedReportId = reportType.code + dateString + '_' + countFormat;
      resolve({err: null, generatedReportId: generatedReportId});
    }
    catch (e) {
      reject(e);
    }
  });
}

const createReport = (
  title, description, location, lat, long, isVehicleInvolved,
  isPeopleInvolved, vehicleInvolvedDescription, peopleInvolvedCount,
  reporterId, hostId, subCategoryId, reportTypeId, urgencyId, generatedReportId, mainCategoryId
) => {
  return new Promise(async(resolve, reject) => {
    try {
      // set the default subCategory 1 is for general
      let defaultSubCategoryId, defaultUrgencyId;
      if (!subCategoryId) {
        defaultSubCategoryId = 1;
      } else {
        defaultSubCategoryId = subCategoryId;
      }
      // set the default urgencyId
      if (!urgencyId) {
        defaultUrgencyId = 1;
      } else {
        defaultUrgencyId = urgencyId;
      }

      const report = await db.report.create({
        title, description, location, lat, long, isVehicleInvolved,
        isPeopleInvolved, vehicleInvolvedDescription, peopleInvolvedCount,
        reporterId, hostId, subCategoryId: defaultSubCategoryId, reportTypeId,
        urgencyId: defaultUrgencyId, reportReportId, status: 'Unresolved', mainCategoryId
      });
      if (!report) {
        resolve({err: 'Was not able to send Report'});
        return;
      }
      resolve({err: null, report: report});
    }
    catch (e) {
      reject(e);
    }
  });
};

const getLatestReport = (queryOption) => {
  return new Promise(async(resolve, reject) => {
    try {
      const getLatestReport = await db.report.findAll({
        where: queryOption,
        order: [
          ['createdAt', 'DESC']
        ],
        limit: 100,
        include: [
          {
            model: db.user, as: 'reporter',
            attributes: [
              'id', 'hostName', 'fname',
              'lname', 'email', 'username',
              'address', 'gender', 'postalCode',
              'city', 'nickName'
            ],
            include: [
              {all: true}
            ]
          }, {
            model: db.user, as: 'host',
            attributes: [
              'id', 'hostName', 'fname',
              'lname', 'email', 'username',
              'address', 'gender', 'postalCode',
              'city', 'nickName'
            ],
            include: [
              { all: true }
            ]
          }, {
            model: db.subCategory,
            incude: [{ model: db.mainCategory }]
          }, {
            model: db.reportType
          }, {
            model: db.urgency
          }
        ]
      });
      resolve({err: null, reports: getLatestReport});
    }
    catch (e) {
      reject(e);
    }
  });
};

const getLatestReportByPage = (itemPerPage, pageNumber, queryOption) => {
  return new Promise(async(resolve, reject) => {
    try {
      let items, offset;
      // limit the number of items to 20
      if (itemPerPage > 20) {
        items = 20;
      } else {
        items = itemPerPage;
      }
      offset = items * pageNumber;
      const reports = await db.report.findAll({
        where: queryOption,
        order: [
          ['createdAt', 'DESC']
        ],
        limit: items,
        offset: offset,
        include: [
          {
            model: db.user, as: 'reporter',
            attributes: [
              'id', 'hostName', 'fname',
              'lname', 'email', 'username',
              'address', 'gender', 'postalCode',
              'city', 'nickName'
            ],
            include: [
              { all: true }
            ]
          }, {
            model: db.user, as: 'host',
            attributes: [
              'id', 'hostName', 'fname',
              'lname', 'email', 'username',
              'address', 'gender', 'postalCode',
              'city', 'nickName'
            ],
            include: [
              { all: true }
            ]
          }, {
            model: db.subCategory,
            incude: [{ model: db.mainCategory }]
          }, {
            model: db.reportType
          }, {
            model: db.urgency
          }
        ]
      });
      resolve({err: null, reports: reports});
    }
    catch (e) {
      reject(e);
    }
  });
};

const getReportById = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const report = await db.report.findOne({
        where: {id},
        include: [
          {
            model: db.user, as: 'reporter',
            attributes: [
              'id', 'hostName', 'fname',
              'lname', 'email', 'username',
              'address', 'gender', 'postalCode',
              'city', 'nickName'
            ],
            include: [
              {all: true}
            ]
          }, {
            model: db.user, as: 'host',
            attributes: [
              'id', 'hostName', 'fname',
              'lname', 'email', 'username',
              'address', 'gender', 'postalCode',
              'city', 'nickName'
            ],
            include: [
              { all: true }
            ]
          }, {
            model: db.subCategory,
            incude: [{ model: db.mainCategory }]
          }, {
            model: db.reportType
          }, {
            model: db.urgency
          }
        ]
      });
      if (!report) {
        resolve({err: `report ID: ${id} does not exist`});
        return;
      }
      resolve({err: null, report: report});
    }
    catch (e) {
      reject(e);
    }
  });
};

const updateReport = (id, note, status ) => {
  return new Promise(async(resolve, reject) => {
    try {
      const updateReport = await db.report.update({id, note, status},{
        where: {id}, returning: true
      });
      if (!updatereport[1][0]) {
        resolve({err: `report ID: ${id} was not updated`});
        return;
      }
      const report = await db.report.findOne({
        where: {id: updatereport[1][0].id},
        include: [
          {
            model: db.user, as: 'reporter',
            attributes: [
              'id', 'hostName', 'fname',
              'lname', 'email', 'username',
              'address', 'gender', 'postalCode',
              'city', 'nickName'
            ],
            include: [
              { all: true }
            ]
          }, {
            model: db.user, as: 'host',
            attributes: [
              'id', 'hostName', 'fname',
              'lname', 'email', 'username',
              'address', 'gender', 'postalCode',
              'city', 'nickName'
            ],
            include: [
              { all: true }
            ]
          }, {
            model: db.subCategory,
            incude: [{ model: db.mainCategory }]
          }, {
            model: db.reportType
          }, {
            model: db.urgency
          }
        ]
      });
      resolve({err: null, report: report});
    }
    catch (e) {
      reject(e);
    }
  });
};

const deleteReport = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const deleteReport = await db.report.destroy({where: {id}, returning: true});
      if (deletereport !== 1) {
        resolve({err: `report ID ${id} does not exist`});
        return;
      }
      resolve({err: null, affectedRows: deleteReport});
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  reportIdGenerator: reportIdGenerator,
  createReport: createReport,
  getLatestReport: getLatestReport,
  getLatestReportByPage: getLatestReportByPage,
  getReportById: getReportById,
  updateReport: updateReport,
  deleteReport: deleteReport
};
