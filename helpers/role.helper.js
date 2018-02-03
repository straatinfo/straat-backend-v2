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

module.exports = {
  findRoleById: findRoleById
};
