const Role = require('../models/Role');
const config = require('../config/development');
var mongoose = require('mongoose');
mongoose.connect(config.db);

const data = [
  {
    _id: '5a75c9de3a06a627a7e8af44',
    name: 'Admin',
    code: 'ADMIN',
    accessLevel: 1
  },
  {
    _id: '5a75c9de3a06a627a7e8af45',
    name: 'Host',
    code: 'HOST',
    accessLevel: 2
  },
  {
    _id: '5a75c9de3a06a627a7e8af46',
    name: 'User',
    code: 'USER',
    accessLevel: 3
  }
]

var done = 0;
for (var i = 0; i < data.length; i++) {
  const newRole = new Role(data[i]);
  newRole.save(function (err, result) {
    done++;
    if (done === data.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
  process.exit(0);
}

