const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  _conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: false }
}, {timestamps: true});

module.exports = mongoose.model('Participant', participantSchema);
