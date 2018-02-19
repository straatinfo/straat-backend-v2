const User = require('../models/User');
const Role = require('../models/Role');
const Config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

var users = [
  new User({
    _id: '5a844e1bf154bc463543b987',
    hostName: 'freeHost',
    email: 'freehost@test.com',
    username: 'freeHost',
    postalCode: '2500 DJ',
    _role: '5a75c9de3a06a627a7e8af45' // should be changed according to _role in db
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
