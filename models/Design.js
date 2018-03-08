const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designSchema = new Schema({
  designName: { type: String, default: 'General', index: true },
  colorOne: { type: String },
  colorTwo: { type: String },
  colorThree: { type: String },
  colorFour: { type: String },
  url: String,
  secure_url: String,
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {timestamps: true});

module.exports = mongoose.model('Design', designSchema);
