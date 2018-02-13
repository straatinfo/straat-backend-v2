const User = require('../models/User');
const Role = require('../models/Role');
const Config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

const users = [
  new User({
    email: 'johnhiggins.avila@gmail.com',
    username: 'AdminJohn',
    postalCode: 'test'
  })
];

Role.findOne({'code': 'ADMIN'}, function(err, role) {
  const newUser = new User();
  if (err) {
    return console.log(err);
    exit();
  }
  console.log(role);
  users[0].password = newUser.encryptPassword('admin');
  users[0]._role = role.id;
  console.log(users[0]);
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
