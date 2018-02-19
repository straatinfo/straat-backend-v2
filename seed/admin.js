const User = require('../models/User');
const Role = require('../models/Role');
const Config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

const newUser = new User();

const users = [
  new User({
    email: 'admin@straat.info',
    username: 'admin',
    postalCode: 'test',
    _role: '5a75c9de3a06a627a7e8af44',
    password: newUser.encryptPassword('admin')
  }),
  new User({
    email: 'johnhiggins.avila@gmail.com',
    username: 'adminJohn',
    postalCode: '11119',
    _role: '5a75c9de3a06a627a7e8af44',
    password: newUser.encryptPassword('admin')
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
}
