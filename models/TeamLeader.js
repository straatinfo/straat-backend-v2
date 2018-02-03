const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamLeaderSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

module.exports = mongoose.model('TeamLeader', teamLeaderSchema);
