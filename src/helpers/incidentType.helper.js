const db = require('../models');

const getIncidentTypes = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const incidentTypes = await db.incidentType.findAll({});
      resolve({err: null, incidentTypes: incidentTypes});
    }
    catch (e) {
      reject(e);
    }
  });
};

const createIncidentType = (code, name, description) => {
  return new Promise(async(resolve, reject) => {
    try {
      const createIncidentType = await db.incidentType.create({code, name, description});
      if (!createIncidentType) {
        resolve({err: 'Incident type was not created'});
        return;
      }
      resolve({err: null, incidentType: createIncidentType});
    }
    catch (e) {
      reject(e);
    }
  });
};

const updateIncidentType = (id, code, name, description) => {
  return new Promise(async(resolve, reject) => {
    try {
      const updatedIncidentType = await db.incidentType.update({code, name, description},{
        where: {id}, returning: true
      });
      if (!updatedIncidentType[1][0]) {
        resolve({err: `Incident type ID: ${id} was not updated`});
        return;
      }
      resolve({err: null, incidentType: updatedIncidentType[1][0]});
    }
    catch (e) {
      reject(e);
    }
  });
};

const deleteIncidentType = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const deletedIncidentType = await db.incidentType.destroy({where: {id}});
      if (deletedIncidentType === 0) {
        resolve({err: `Incident Type ID: ${id} does not exists`});
        return;
      }
      resolve({err: null, affectedRows: deletedIncidentType});
    }
    catch (e) {
      reject(e);
    }
  });
};


module.exports = {
  getIncidentTypes: getIncidentTypes,
  createIncidentType: createIncidentType,
  updateIncidentType: updateIncidentType,
  deleteIncidentType: deleteIncidentType
};
