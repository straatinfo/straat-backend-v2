const User = require('../models/User');
const Role = require('../models/Role');
const Config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

var users = [
  new User({
    hostName: 'freeHost',
    email: 'freehost@test.com',
    username: 'freeHost',
    postalCode: '2500 DJ',
    _role: '5a79be1d7d1aeb41665af29e' // should be changed according to _role in db
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
