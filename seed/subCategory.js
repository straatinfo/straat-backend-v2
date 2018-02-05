const SubCategory = require('../models/SubCategory');
const MainCategory = require('../models/MainCategory');
const Config = require('../config');
var mongoose = require('mongoose');

mongoose.connect(Config.DATA_BASE);

var subCategories = [
  new SubCategory({
    name: 'General'
  })
];

subCategories.map( function (subCategory) {
  MainCategory.findOne({'name': 'General'}, function(err, reportType){
    if (err) {
      console.log(err);
      exit();
    }
    if (!reportType) {
      console.log('No ReportType');
      exit();
    }
    console.log(subCategory);
    subCategory._reportType = reportType._id;
    subCategory.save(function (err, result) {
      exit();
    });
  });
});

function exit() {
  mongoose.disconnect();
}
