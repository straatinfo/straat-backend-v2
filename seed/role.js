const Role = require('../models/Role');
const Config = require('../config');
var mongoose = require('mongoose');

mongoose.connect(Config.DATA_BASE);

var roles = [
  new Role({
    _id: '5a75c9de3a06a627a7e8af44',
    name: 'Admin',
    code: 'ADMIN',
    accessLevel: 1
  }),
  new Role({
    _id: '5a75c9de3a06a627a7e8af45',
    name: 'Host',
    code: 'HOST',
    accessLevel: 2
  }),
  new Role({
    _id: '5a75c9de3a06a627a7e8af46',
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
