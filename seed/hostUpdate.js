// 5a94e46278cfdb0014020d18
const User = require('../models/User');
const Role = require('../models/Role');
const Config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);


Role.findOne({'code': 'HOST'}, (err, role) => {
  if (err) {
    console.log(err);
    exit();
  }
  console.log(role);
  User.find({'_id': '5a7b485a039e2860cf9dd19a'}, async(err, users) => {
    if (err) {
      console.log(err);
      return exit();
    }
    const updater = await Promise.all(users.map((d) => {
      const newUser = new User();
      User.findByIdAndUpdate(d._id, {password: newUser.encryptPassword('test')}, (err, user) => {
        if (err) {
          console.log(err);
        }
        console.log(user);
        return user;
      });
    }));
    exit();
  });
});

function exit() {
  mongoose.disconnect();
}
