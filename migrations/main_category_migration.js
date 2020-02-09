const MainCategory = require('../models/MainCategory');
var mongoose = require('mongoose');
const config = require('../config/development');
mongoose.connect(config.db);

var mainCategories = [
  new MainCategory({
    _id: '5a788e456f94354ba0856e66',
    _host: '5a844e1bf154bc463543b987',
    _reportType: '5a7888bb04866e4742f74955',
    name: 'General A'
  }),
  new MainCategory({
    _host: '5a844e1bf154bc463543b987',
    _reportType: '5a7888bb04866e4742f74956',
    name: 'General B'
  }),
  new MainCategory({
    _host: '5a844e1bf154bc463543b987',
    _reportType: '5a7888bb04866e4742f74957',
    name: 'General C'
  })
];

var done = 0;
for (var i = 0; i < mainCategories.length; i++) {
  mainCategories[i].save(function (err, result) {
    done++;
    if (done === mainCategories.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
  process.exit(0);
}
