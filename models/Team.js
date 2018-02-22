const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  teamName: { type: String, required: true, unique: true, index: true },
  teamEmail: { type: String, required: true, unique: true },
  logoUrl: { type: String },
  logoSecuredUrl: { type: String },
  description: { type: String },
  isVolunteer: { type: Boolean, default: true },
  isApproved: { type: Boolean, default: false },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teamLeaders: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'TeamLeader'
  }],
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember'
  }],
  reports: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Report'
  }],
  conversations: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
