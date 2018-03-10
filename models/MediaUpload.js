const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaUploadSchema = new Schema({
  public_id: { type: String, unique: true, required: true },
  mimetype: { type: String, required: true },
  url: { type: String, required: true },
  secure_url: { type: String, required: true },
  format: { type: String, required: true },
  etag: { type: String, required: true },
  width: Number,
  height: Number
}, { timestamps: true });

module.exports = mongoose.model('MediaUpload', mediaUploadSchema);
