const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  title: { type: String , default: '' },
  type: { type: String, enum: ['private', 'team', 'global'], default: 'team' },
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Participant'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Message'
  }]
});

module.exports = mongoose.model('Conversation', conversationSchema);
