const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainCategorySchema = new Schema({
  name: { type: String, index: true },
  description: { type: String },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  _reportType: { type: mongoose.Schema.Types.ObjectId, ref: 'ReportType', required: true },
  reports: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Report'
  }],
  subCategories: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory'
  }]
}, {timestamps: true});

module.exports = mongoose.model('MainCategory', mainCategorySchema);
