const db = require('../models');

const getUrgencies = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const urgencies = await db.priority.findAll({});
      resolve({err: null, urgencies: urgencies});
    }
    catch (e) {
      reject(e);
    }
  });
}

const createPriority = (name, description) => {
  return new Promise(async(resolve, reject) => {
    try {
      const createPriority = await db.priority.create({name, description});
      if (!createPriority) {
        resolve({err: 'Invalid Input'});
        return;
      }
      resolve({err: null, priority: createPriority});
    }
    catch (e) {
      reject(e);
    }
  });
};

const updatePriority = (id, name, description) => {
  return new Promise(async(resolve, reject) => {
    try {
      const updatedPriority = await db.priority.update({name, description}, {
        where: {id}, returning: true
      });
      if (!updatedPriority[1][0]) {
        resolve({err: `Priority ID: ${id} does not exists`});
        return;
      }
      resolve({err: null, priority: updatedPriority[1][0]});
    }
    catch (e) {
      reject(e);
    }
  });
};

const deletePriority = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const deletedPriority = await db.priority.destroy({
        where: {id}
      });
      if (deletedPriority === 0) {
        resolve({err: `Priority ID: ${id} does not exists`});
        return;
      }
      resolve({err: null, affectedRows: deletedPriority});
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getUrgencies: getUrgencies,
  createPriority: createPriority,
  updatePriority: updatePriority,
  deletePriority: deletePriority
};
