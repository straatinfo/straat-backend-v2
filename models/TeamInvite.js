const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const teamInivteSchema = new Schema({
  _team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isRequest: { type: Boolean, default: true } // tells if its an invite or request
}, {timestamps: true });

module.exports = mongoose.model('TeamInvite', teamInivteSchema);
