const Role = require('../models/Role');
const Config = require('../config');
const User = require('../models/User');
var mongoose = require('mongoose');
mongoose.connect(Config.DATA_BASE);

User.updateMany({}, {'softRemoved': false}, (err, user) => {
  if (err) {
    console.log(err);
    return exit();
  }
  console.log('Success');
  exit();
});

function exit() {
  mongoose.disconnect();
}
