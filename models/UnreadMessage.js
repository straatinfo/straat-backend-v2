const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  _message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true, index: true },
  _conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true, index: true },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  _report: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' },
  _team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  type: { type: String, enum: ['INDIVIDUAL', 'REPORT', 'TEAM'] }
}, { timestamps: true });

module.exports = mongoose.model('UnreadMessage', messageSchema);
