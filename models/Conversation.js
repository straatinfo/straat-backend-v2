const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  title: { type: String , default: 'untilted conversation', index: true },
  type: { type: String, enum: ['private', 'team', 'global'], default: 'team' },
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Participant'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Message'
  }]
}, {timestamps: true});

module.exports = mongoose.model('Conversation', conversationSchema);
