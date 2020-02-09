const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  teamName: { type: String, required: true, unique: true, index: true },
  teamEmail: { type: String, required: true }, // problem in creating new team @may 3 2018
  description: { type: String },
  isVolunteer: { type: Boolean, default: true },
  isApproved: { type: Boolean, default: true },
  isDeclined: { type: Boolean, default: false },
  softRemoved: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creationMethod: { type: String, default: 'MOBILE' },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  _profilePic: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaUpload' },
  _conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'}
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
