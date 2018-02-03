const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainCategorySchema = new Schema({
  name: { type: String },
  description: { type: String },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reportType: { type: mongoose.Schema.Types.ObjectId, ref: 'ReportType' },
  reports: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Report'
  }],
  subCategories: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory'
  }]
});

module.exports = mongoose.model('MainCategory', mainCategorySchema);
