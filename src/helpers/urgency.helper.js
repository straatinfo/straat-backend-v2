const db = require('../models');

const getUrgencies = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const urgencies = await db.urgency.findAll({});
      resolve({err: null, urgencies: urgencies});
    }
    catch (e) {
      reject(e);
    }
  });
}

const createUrgency = (name, description) => {
  return new Promise(async(resolve, reject) => {
    try {
      const createUrgency = await db.urgency.create({name, description});
      if (!createUrgency) {
        resolve({err: 'Invalid Input'});
        return;
      }
      resolve({err: null, urgency: createUrgency});
    }
    catch (e) {
      reject(e);
    }
  });
};

const updateUrgency = (id, name, description) => {
  return new Promise(async(resolve, reject) => {
    try {
      const updatedUrgency = await db.urgency.update({name, description}, {
        where: {id}, returning: true
      });
      if (!updatedUrgency[1][0]) {
        resolve({err: `Urgency ID: ${id} does not exists`});
        return;
      }
      resolve({err: null, urgency: updatedUrgency[1][0]});
    }
    catch (e) {
      reject(e);
    }
  });
};

const deleteUrgency = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const deletedUrgency = await db.urgency.destroy({
        where: {id}
      });
      if (deletedUrgency === 0) {
        resolve({err: `Urgency ID: ${id} does not exists`});
        return;
      }
      resolve({err: null, affectedRows: deletedUrgency});
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getUrgencies: getUrgencies,
  createUrgency: createUrgency,
  updateUrgency: updateUrgency,
  deleteUrgency: deleteUrgency
};
