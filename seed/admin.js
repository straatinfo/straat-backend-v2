const User = require('../models/User');
const Role = require('../models/Role');
const Config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

const users = [
  new User({
    email: 'Admin2@test.com',
    username: 'admin2',
    postalCode: '12344'
  })
];

Role.findOne({'code': 'ADMIN'}, function(err, role) {
  const newUser = new User();
  if (err) {
    return console.log(err);
    exit();
  }
  users[0].password = newUser.encryptPassword('test');
  users[0].role = role.id;
  users[0].save(function(err, user){
    if (err) {
      return console.log(err);
      exit();
    }
    console.log('Success');
    exit();
  });
});

function exit() {
  mongoose.disconnect();
}
