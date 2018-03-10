const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  title: { type: String , default: 'Untilted conversation', index: true },
  type: { type: String, enum: ['PRIVATE', 'GROUP', 'TEAM', 'GLOBAL'], default: 'TEAM' },
  _team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  _profilePic: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaUpload' },
  participants: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Participant'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Message'
  }]
}, {timestamps: true});

module.exports = mongoose.model('Conversation', conversationSchema);
