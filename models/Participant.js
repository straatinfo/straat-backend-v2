const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  _conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', index: true },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }
});

module.exports = mongoose.model('Participant', participantSchema);
