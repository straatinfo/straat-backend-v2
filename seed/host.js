const User = require('../models/User');
const Role = require('../models/Role');
const Config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);
const newUser = new User();

var users = [
  new User({
    _id: '5a7b485a039e2860cf9dd19a',
    hostName: 'Gemeente Den Haag',
    email: 'denhaag@straat.info',
    username: 'Gemeente Den Haag',
    streetName: 'Postbus 12600',
    city: 'S-GRAVENHAGE',
    country: 'Netherlands',
    postalCode: '2500 DJ',
    phoneNumber: '14070',
    _role: '5a75c9de3a06a627a7e8af45',
    password: newUser.encryptPassword('test')
  }),
  // new User({
  //   _id: '5a7b485a039e2860cf9dd19b',
  //   hostName: 'Gemeente Vlaardingen',
  //   email: 'vlaardingen@straat.info',
  //   username: 'Gemeente Vlaardingen',
  //   streetName: 'Postbus 1002',
  //   city: 'VLAARDINGEN',
  //   country: 'Netherlands',
  //   postalCode: '3130 EB',
  //   phoneNumber: '(010) 248 40 00',
  //   _role: '5a75c9de3a06a627a7e8af45'
  // }),
  // new User({
  //   _id: '5a844e1bf154bc463543b987',
  //   hostName: 'freeHost',
  //   email: 'freehost@test.com',
  //   username: 'freeHost',
  //   postalCode: '2500 DJ',
  //   _role: '5a75c9de3a06a627a7e8af45' // should be changed according to _role in db
  // }),
  // new User({
  //   _id: '5a844e1bf154bc463543b988',
  //   hostName: 'globalbrainforce',
  //   email: 'john@globalbrainforce.com',
  //   username: 'JohnGlobal',
  //   postalCode: '1119',
  //   _role: '5a75c9de3a06a627a7e8af45',
  //   password: newUser.encryptPassword('test')
  // })
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
