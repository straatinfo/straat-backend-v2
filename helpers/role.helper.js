const Role = require('../models/Role');

const findRoleById = (id) => {
  return new Promise((resolve, reject) => {
    Role.findById(id, function(err, role) {
      if (err) {
        return resolve({err: err});
      }
      if (!role) {
        return resolve({err: 'Invalid role ID'});
      }
      resolve({err: null, role: role});
    });
  });
};

const getRoleByCode = (code =  'HOST') => {
  return new Promise((resolve, reject) => {
    Role.findOne({'code': code}, (err, role) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, role: role});
    });
  });
};

const getRoleByAccessLevel = (accesslevel = 3) => {
  return new Promise((resolve, reject) => {
    Role.findOne({'accessLevel': accesslevel}, (err, role) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, role: role});
    });
  });
};

module.exports = {
  findRoleById: findRoleById,
  getRoleByCode: getRoleByCode,
  getRoleByAccessLevel: getRoleByAccessLevel
};
