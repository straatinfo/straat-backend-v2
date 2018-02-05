const MainCategory = require('../models/MainCategory');
const ReportType = require('../models/ReportType');
const Config = require('../config');
var mongoose = require('mongoose');

mongoose.connect(Config.DATA_BASE);

var mainCategories = [
  new MainCategory({
    name: 'General'
  })
];

mainCategories.map( function (mainCategory) {
  ReportType.findOne({'code': 'A'}, function(err, reportType){
    if (err) {
      console.log(err);
      exit();
    }
    if (!reportType) {
      console.log('No ReportType');
      exit();
    }
    console.log(mainCategory);
    mainCategory._reportType = reportType._id;
    mainCategory.save(function (err, result) {
      exit();
    });
  });
});

function exit() {
  mongoose.disconnect();
}
