const mongoose = require('mongoose')
const Schema = mongoose.Schema

const designSchema = new Schema({
  designName: { type: String, default: 'General', index: true },
  colorOne: { type: String },
  colorTwo: { type: String },
  colorThree: { type: String },
  colorFour: { type: String },
  _profilePic: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaUpload' },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }
}, {timestamps: true})

module.exports = mongoose.model('Design', designSchema)
