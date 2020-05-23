const User = require('../models/User');
const Role = require('../models/Role');
const config = require('../config/development');
var mongoose = require('mongoose');
mongoose.connect(config.db);

const newUser = new User();

const users = [
  new User({
    email: 'admin@straat.info',
    username: 'admin',
    postalCode: 'test',
    _role: '5a75c9de3a06a627a7e8af44',
    password: 'admin'
  })
];

var done = 0;
for (var i = 0; i < users.length; i++) {
  users[i].save(function (err, result) {
    done++;
    if (done === users.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
  process.exit(0);
}
