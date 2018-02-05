const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true, index: true },
  email: { type: String },
  logo: { type: String },
  description: { type: String },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teamLeaders: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'TeamLeader'
  }],
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember'
  }]
});

module.exports = mongoose.model('Team', teamSchema);
