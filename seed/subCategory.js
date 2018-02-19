const SubCategory = require('../models/SubCategory');
const MainCategory = require('../models/MainCategory');
const Config = require('../config');
var mongoose = require('mongoose');

mongoose.connect(Config.DATA_BASE);

var subCategories = [
  new SubCategory({
    _mainCategory: '5a788e456f94354ba0856e66',
    name: 'General'
  })
];

var done = 0;
for (var i = 0; i < subCategories.length; i++) {
  subCategories[i].save(function (err, result) {
    MainCategory.findByIdAndUpdate(result._mainCategory,
    { '$push': { 'subCategories': result._id } },
    (err, mainCategory) => {
      done++;
      if (done === subCategories.length) {
        exit();
      }
    });
  });
}

function exit() {
  mongoose.disconnect();
}
