const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamMemberSchema = new Schema({
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
