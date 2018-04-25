const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  title: { type: String , default: 'Untilted conversation', index: true },
  type: { type: String, enum: ['PRIVATE', 'GROUP', 'TEAM', 'REPORT', 'GLOBAL'], default: 'TEAM' },
  _team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  _report: { type: mongoose.Schema.Types.ObjectId, ref: 'REPORT' },
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  _profilePic: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaUpload' },
  participants: [{
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isActive: Boolean
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Message'
  }]
}, {timestamps: true});

module.exports = mongoose.model('Conversation', conversationSchema);
