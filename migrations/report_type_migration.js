const ReportType = require('../models/ReportType');
const Config = require('../config/development');
var mongoose = require('mongoose');

mongoose.connect(Config.db);

var reportTypes = [
  new ReportType({
    _id: '5a7888bb04866e4742f74955',
    code: 'A',
    name: 'Public Space'
  }),
  new ReportType({
    _id: '5a7888bb04866e4742f74956',
    code: 'B',
    name: 'Safety'
  }),
  new ReportType({
    _id: '5a7888bb04866e4742f74957',
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
  process.exit(0);
}
