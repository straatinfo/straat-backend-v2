const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamLeaderSchema = new Schema({
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

module.exports = mongoose.model('TeamLeader', teamLeaderSchema);