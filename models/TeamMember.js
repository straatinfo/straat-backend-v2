const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamMemberSchema = new Schema({
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  _team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  active: { type: Boolean, default: true },
  isLeader: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
