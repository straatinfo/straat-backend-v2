const User = require('../models/User');
const Role = require('../models/Role');
const Config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

var users = [
  new User({
    hostName: 'Gemeente Den Haag',
    email: 'denhaag@straat.info',
    username: 'Gemeente Den Haag',
    streetName: 'Postbus 12600',
    city: 'S-GRAVENHAGE',
    country: 'Netherlands',
    postalCode: '2500 DJ',
    phoneNumber: '14070',
    _role: '5a79be1d7d1aeb41665af29e' // should be changed
  }),
  new User({
    hostName: 'Gemeente Vlaardingen',
    email: 'vlaardingen@straat.info',
    username: 'Gemeente Vlaardingen',
    streetName: 'Postbus 1002',
    city: 'VLAARDINGEN',
    country: 'Netherlands',
    postalCode: '3130 EB',
    phoneNumber: '(010) 248 40 00',
    _role: '5a79be1d7d1aeb41665af29e' // should be changed
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
