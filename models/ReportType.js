const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportTypeSchema = new Schema({
  code: { type: String, unique: true },
  name: { type: String },
  description: { type: String }
}, {timestamps: true});

module.exports = mongoose.model('ReportType', reportTypeSchema);
