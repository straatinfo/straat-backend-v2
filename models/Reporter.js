const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  id: { type: Number },
  volunteer: { type: String },
  status1: { type: String },
  status2: { type: String },  
  _reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  _team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });

module.exports = mongoose.model('Reporter', reportSchema);
