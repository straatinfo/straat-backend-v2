const SubCategory = require('../models/SubCategory');
const Config = require('../config/development');
var mongoose = require('mongoose');

mongoose.connect(Config.db);

var subCategories = [
  new SubCategory({
    _mainCategory: '5a788e456f94354ba0856e66',
    name: 'General Sub'
  })
];

var done = 0;
for (var i = 0; i < subCategories.length; i++) {
  subCategories[i].save(function (err, result) {
    done++;
    if (done === subCategories.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
  process.exit(0);
}
