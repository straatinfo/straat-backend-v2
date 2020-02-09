const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs');

const HostSchema = new Schema({
  hostName: { type: String, indexed: true },
  hostAlternateName: { type: String, indexed: true },
  email: { type: String, required: true, indexed: true , unique: true },
  hostPersonalEmail: { type: String },
  username: { type: String, unique: false },
  password: { type: String },
  fname: { type: String },
  lname: { type: String },
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
  isVolunteer: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  isActivated: { type: Boolean, default: false },                            // this is for host
  isSpecific: { type: Boolean, default: false },
  softRemoved: { type: Boolean, default: false },
  _profilePic: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaUpload' },
  _design: { type: mongoose.Schema.Types.ObjectId, ref: 'Design' },    // for host
  _role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  firebaseTokens: [{
    deviceId: { type: String, required: true, index: true },
    platform: { type: String, enum: ['IOS', 'ANDROID', 'WEB'], default: 'ANDROID' },
    token: { type: String, required: true, index: true }
  }]
}, {timestamps: true})

HostSchema.index({geoLocation: '2dsphere'})

HostSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = mongoose.model('Host', HostSchema)
