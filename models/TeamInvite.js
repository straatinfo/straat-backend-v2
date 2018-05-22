const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const teamInivteSchema = new Schema({
  _team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true, indexed: true },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, indexed: true },
  isRequest: { type: Boolean, default: true } // tells if its an invite or request
}, {timestamps: true });

module.exports = mongoose.model('TeamInvite', teamInivteSchema);
