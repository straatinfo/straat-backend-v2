const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  hostName: { type: String, indexed: true },
  email: { type: String, required: true, indexed: true , unique: true},
  username: { type: String, unique: true },
  password: { type: String },
  fname: { type: String },
  lname: { type: String },
  gender: { type: String },
  houseNumber: { type: String },
  streetName: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postalCode: { type: String, required: true, indexed: true },
  phoneNumber: { type: String },
  long: { type: Number },
  lat: { type: Number },
<<<<<<< HEAD
=======
  isVolunteer: { type: Boolean, default: false },
>>>>>>> 128f8c64d6e5a41adbb3204c31daf429df67a486
  isBlocked: { type: Boolean, default: false },
  isPatron: { type: Boolean, default: false },
  _role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  constituents: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
  teams: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Team'
  }],
  teamLeaders: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'TeamLeader'
  }],
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember'
  }],
  designs: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Design'
  }]
});

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = mongoose.model('User', userSchema);
