const db = require('../models');

const getReportTypes = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const reportTypes = await db.reportType.findAll({});
      resolve({err: null, reportTypes: reportTypes});
    }
    catch (e) {
      reject(e);
    }
  });
};

const createReportType = (code, name, description) => {
  return new Promise(async(resolve, reject) => {
    try {
      const createReportType = await db.reportType.create({code, name, description});
      if (!createReportType) {
        resolve({err: 'Report type was not created'});
        return;
      }
      resolve({err: null, reportType: createReportType});
    }
    catch (e) {
      reject(e);
    }
  });
};

const updateReportType = (id, code, name, description) => {
  return new Promise(async(resolve, reject) => {
    try {
      const updatedReportType = await db.reportType.update({code, name, description},{
        where: {id}, returning: true
      });
      if (!updatedReportType[1][0]) {
        resolve({err: `Report type ID: ${id} was not updated`});
        return;
      }
      resolve({err: null, reportType: updatedReportType[1][0]});
    }
    catch (e) {
      reject(e);
    }
  });
};

const deleteReportType = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const deletedReportType = await db.reportType.destroy({where: {id}});
      if (deletedReportType === 0) {
        resolve({err: `Report Type ID: ${id} does not exists`});
        return;
      }
      resolve({err: null, affectedRows: deletedReportType});
    }
    catch (e) {
      reject(e);
    }
  });
};


module.exports = {
  getReportTypes: getReportTypes,
  createReportType: createReportType,
  updateReportType: updateReportType,
  deleteReportType: deleteReportType
};
