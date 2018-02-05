const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportPhotoSchema = new Schema({
  _report: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' },
  public_id: String,
  mimetype: String,
  url: String,
  secure_url: String,
  format: String,
  etag: String,
  width: Number,
  height: Number
}, { timestamps: true });

module.exports = mongoose.model('ReportPhoto', reportPhotoSchema);
