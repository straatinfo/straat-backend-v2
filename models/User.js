const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  hostName: { type: String, indexed: true },
  hostAlternateName: { type: String, indexed: true },
  email: { type: String, required: true, indexed: true , unique: true },
  hostPersonalEmail: { type: String },
  username: { type: String, unique: false },
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
  geoLocation: {
    type: {type: String, enum: 'Point', default: 'Point'},
    coordinates: { type: [Number], default: [0, 0] }                         // [long, lat] ; used by admin or user
  },
  setting: {
    isNotification: { type: Boolean, default: true },
    vibrate: { type: Boolean, default: true },
    sound: { type: Boolean, default: true },
    radius: { type: Number, default: 300 },
    isNotified: { type: Boolean },
  },
  language: { type: String, default: 'nl' },
  fcmToken: { type: String, default: null },                                 // fcm token: use for kiled, background notification for user
  socketToken: { type: String, default: null },                              // soket token: use for websocket live connection broadcast
  isVolunteer: { type: Boolean, default: false },
  isOnline: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  isPatron: { type: Boolean, default: false },
  isActivated: { type: Boolean, default: false },                            // this is for host
  isSpecific: { type: Boolean, default: false },
  softRemoved: { type: Boolean, default: false },
  _profilePic: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaUpload' },
  _activeDesign: { type: mongoose.Schema.Types.ObjectId, ref: 'Design' },    // for host
  _role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _activeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },        // for Reporters/ordinary user
  reporters: [{
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
  }],
  mainCategories: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory'
  }],
  hostReports: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Report'
  }],
  reporterReports: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Report'
  }],
  conversations: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Message'
  }]
}, {timestamps: true});

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.index({geoLocation: '2dsphere'})

module.exports = mongoose.model('User', userSchema);
