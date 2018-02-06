const Role = require('../models/Role');
const Config = require('../config');
var mongoose = require('mongoose');

mongoose.connect(Config.DATA_BASE);

var roles = [
  new Role({
    name: 'Admin',
    code: 'ADMIN',
    accessLevel: 1
  }),
  new Role({
    name: 'Host',
    code: 'HOST',
    accessLevel: 2
  }),
  new Role({
    name: 'User',
    code: 'USER',
    accessLevel: 3
  })
  
];

var done = 0;
for (var i = 0; i < roles.length; i++) {
  roles[i].save(function (err, result) {
    done++;
    if (done === roles.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
