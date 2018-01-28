const db = require('../models');
const Op = require('sequelize').Op;
const incidentIdGenerator = (incidentTypeId) => {
  // incidentId format A20170924_00001
  return new Promise(async(resolve, reject) => {
    try {
      const incidentType = await db.incidentType.findOne({where: {id: incidentTypeId}});
      if (!incidentType) {
        resolve({err: 'Invalid Incident Type ID'});
        return;
      }
      const date = new Date();
      const monthstr = "" + (date.getMonth() + 1);
      const monthPad = "00";
      const monthFormat = monthPad.substring(0, monthPad.length - monthstr.length) + monthstr;
      console.log(monthFormat);
      const dateString = date.getFullYear() + '' + monthFormat + '' + date.getDate();
      const incidents = await db.incident.findAll({
        where: {
          [Op.and]: [
            { createdAt: { [Op.gte]: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) } },
            { createdAt: { [Op.lte]: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1) } }
          ]
        }
      });
      const incidentCount = incidents.length + 1;
      const str = "" + incidentCount;
      const pad = "00000"
      const countFormat = pad.substring(0, pad.length - str.length) + str;
      const incidentReportId = incidentType.code + dateString + '_' + countFormat;
      resolve({err: null, incidentReportId: incidentReportId});
    }
    catch (e) {
      reject(e);
    }
  });
}

const reportIncident = (
  title, description, location, lat, long, isVehicleInvolved,
  isPeopleInvolved, vehicleInvolvedDescription, peopleInvolvedCount,
  reporterId, hostId, subCategoryId, incidentTypeId, urgencyId, incidentReportId
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

      const report = await db.incident.create({
        title, description, location, lat, long, isVehicleInvolved,
        isPeopleInvolved, vehicleInvolvedDescription, peopleInvolvedCount,
        reporterId, hostId, subCategoryId: defaultSubCategoryId, incidentTypeId,
        urgencyId: defaultUrgencyId, incidentReportId, status: 'Unresolved'
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

const getLatestIncident = (queryOption) => {
  return new Promise(async(resolve, reject) => {
    try {
      const getLatestIncident = await db.incident.findAll({
        where: queryOption,
        order: [
          ['createdAt', 'DESC']
        ],
        limit: 100,
        include: [
          {
            model: db.user, as: 'reporter',
            attributes: [
              'id', 'institutionName', 'fname',
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
              'id', 'institutionName', 'fname',
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
            model: db.incidentType
          }, {
            model: db.urgency
          }
        ]
      });
      resolve({err: null, incidents: getLatestIncident});
    }
    catch (e) {
      reject(e);
    }
  });
};

const getLatestIncidentByPage = (itemPerPage, pageNumber, queryOption) => {
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
      const reports = await db.incident.findAll({
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
              'id', 'institutionName', 'fname',
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
              'id', 'institutionName', 'fname',
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
            model: db.incidentType
          }, {
            model: db.urgency
          }
        ]
      });
      resolve({err: null, incidents: reports});
    }
    catch (e) {
      reject(e);
    }
  });
};

const getIncidentById = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const incident = await db.incident.findOne({
        where: {id},
        include: [
          {
            model: db.user, as: 'reporter',
            attributes: [
              'id', 'institutionName', 'fname',
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
              'id', 'institutionName', 'fname',
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
            model: db.incidentType
          }, {
            model: db.urgency
          }
        ]
      });
      if (!incident) {
        resolve({err: `Incident ID: ${id} does not exist`});
        return;
      }
      resolve({err: null, incident: incident});
    }
    catch (e) {
      reject(e);
    }
  });
};

const updateIncident = (id, note, status ) => {
  return new Promise(async(resolve, reject) => {
    try {
      const updateIncident = await db.incident.update({id, note, status},{
        where: {id}, returning: true
      });
      if (!updateIncident[1][0]) {
        resolve({err: `Incident ID: ${id} was not updated`});
        return;
      }
      const incident = await db.incident.findOne({
        where: {id: updateIncident[1][0].id},
        include: [
          {
            model: db.user, as: 'reporter',
            attributes: [
              'id', 'institutionName', 'fname',
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
              'id', 'institutionName', 'fname',
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
            model: db.incidentType
          }, {
            model: db.urgency
          }
        ]
      });
      resolve({err: null, incident: incident});
    }
    catch (e) {
      reject(e);
    }
  });
};

const deleteIncident = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const deleteIncident = await db.incident.destroy({where: {id}, returning: true});
      if (deleteIncident !== 1) {
        resolve({err: `Incident ID ${id} does not exist`});
        return;
      }
      resolve({err: null, affectedRows: deleteIncident});
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  incidentIdGenerator: incidentIdGenerator,
  reportIncident: reportIncident,
  getLatestIncident: getLatestIncident,
  getLatestIncidentByPage: getLatestIncidentByPage,
  getIncidentById: getIncidentById,
  updateIncident: updateIncident,
  deleteIncident: deleteIncident
};
