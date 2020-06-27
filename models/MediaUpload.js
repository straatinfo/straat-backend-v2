const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaUploadSchema = new Schema({
  isUsed: { type: Boolean, default: false },
  public_id: { type: String, unique: true, required: true },
  mimetype: { type: String, required: true },
  url: { type: String, required: true },
  secure_url: { type: String, required: true },
  format: { type: String, required: true },
  etag: { type: String, required: true },
  width: Number,
  height: Number
}, { timestamps: true });

mediaUploadSchema.statics.setToInUse = async function (mediaId) {
  try {
    const updatedMediaUpload = await MediaUpload.findOneAndUpdate({ _id: mediaId }, { isUsed: true });
    return updatedMediaUpload;
  } catch (e) {
    throw e;
  }
};

mediaUploadSchema.statics.setToInUnUse = async function (mediaId) {
  try {
    const updatedMediaUpload = await MediaUpload.findOneAndUpdate({ _id: mediaId }, { isUsed: false });
    return updatedMediaUpload;
  } catch (e) {
    throw e;
  }
};

const MediaUpload = mongoose.model('MediaUpload', mediaUploadSchema);

module.exports = MediaUpload;
