const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  _profilePic: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaUpload' },
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ]
}, {timestamps: true});

module.exports = mongoose.model('Conversation', conversationSchema);
