const User = require('../models/User');
const Role = require('../models/Role');
const Config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

var users = [
  new User({
    hostName: 'host1',
    email: 'host@test.com',
    username: 'host1',
    houseNumber: '34',
    streetName: 'sesame',
    city: 'Sample City',
    state: 'Sample state',
    country: 'USA',
    postalCode: '32233',
    phoneNumber: '232334234',
    long: '78.25',
    lat: '87.32',
    _role: '5a75c9de3a06a627a7e8af45' // should be changed
  }),
  new User({
    hostName: 'host2',
    email: 'host2@test.com',
    username: 'host2',
    houseNumber: '34',
    streetName: 'sesame',
    city: 'Sample City',
    state: 'Sample state',
    country: 'USA',
    postalCode: '32233',
    phoneNumber: '232334234',
    long: '78.25',
    lat: '87.32',
    _role: '5a75c9de3a06a627a7e8af45' // should be changed
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
