const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  body: { type: String },
  _conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
