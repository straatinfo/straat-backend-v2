const MainCategory = require('../models/MainCategory');
const User = require('../models/User');
const ReportType = require('../models/ReportType');
const Config = require('../config');
var mongoose = require('mongoose');

mongoose.connect(Config.DATA_BASE);

var mainCategories = [
  new MainCategory({
    _id: '5a788e456f94354ba0856e66',
    _host: '5a844e1bf154bc463543b987',
    _reportType: '5a7888bb04866e4742f74955',
    name: 'General'
  })
];

var done = 0;
for (var i = 0; i < mainCategories.length; i++) {
  mainCategories[i].save(function (err, result) {
    ReportType.findByIdAndUpdate(result._reportType,
    { '$push': { 'mainCategories': result._id } },
    { 'new': true, 'upsert': true },
    (err, reportType) => {
      User.findByIdAndUpdate(result._host,
      { '$push': { 'mainCategories': result._id } },
      { 'new': true, 'upsert': true },
      (err, user) => {
        done++;
        if (done === mainCategories.length) {
          exit();
        }
      });
    });
  });
}

function exit() {
  mongoose.disconnect();
}
