const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportTypeSchema = new Schema({
  code: { type: String, unique: true },
  name: { type: String },
  description: { type: String },
  reports: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Report'
  }],
  mainCategory: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory'
  }]
});

module.exports = mongoose.model('ReportType', reportTypeSchema);
