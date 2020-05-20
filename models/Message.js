const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  _receiever: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isRead: { type: Boolean, default: false },
  body: { type: String },
  attachments: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'MediaUpload' // attachment links
  }],
  _conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
