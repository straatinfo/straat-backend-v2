const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  message: { type: String, index: true },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  device: { type: String, index: true }
}, {timestamps: true});

module.exports = mongoose.model('Feedback', feedbackSchema);
