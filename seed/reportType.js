const ReportType = require('../models/ReportType');
const Config = require('../config');
var mongoose = require('mongoose');

mongoose.connect(Config.DATA_BASE);

var reportTypes = [
  new ReportType({
    code: 'A',
    name: 'Public Space'
  }),
  new ReportType({
    code: 'B',
    name: 'Safety'
  }),
  new ReportType({
    code: 'C',
    name: 'Communication'
  })
];

var done = 0;
for (var i = 0; i < reportTypes.length; i++) {
  reportTypes[i].save(function (err, result) {
    done++;
    if (done === reportTypes.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
