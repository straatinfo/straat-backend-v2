const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const lib = require('../lib');

const userSchema = new Schema({
  email: { type: String, required: true, indexed: true , unique: true },
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
  isVolunteer: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  isActivated: { type: Boolean, default: true },                            // this is for host
  isSpecific: { type: Boolean, default: false },
  softRemoved: { type: Boolean, default: false },
  _profilePic: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaUpload' },
  _activeDesign: { type: mongoose.Schema.Types.ObjectId, ref: 'Design' },    // for host
  _role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },       // for Reporters/ordinary user
  firebaseTokens: [{
    deviceId: { type: String, required: true, index: true },
    platform: { type: String, enum: ['IOS', 'ANDROID', 'WEB'], default: 'ANDROID' },
    token: { type: String, required: true, index: true }
  }]
}, {timestamps: true});

userSchema.statics.addOrUpdateDevice = async ({ reporterId, deviceId, token, platform }) => {
  try {
    const user = await User.findOne({ _id: reporterId }).populate('firebaseTokens');
    const firebaseTokens = user.firebaseTokens || [];
    const newFirebaseTokens = firebaseTokens
      .reduce((pv, cv) => {
        if (cv.deviceId == deviceId) {
          return pv;
        } else {
          return pv.concat([cv])
        }
      }, []);
    newFirebaseTokens.push({ deviceId: deviceId, token: token, platform: platform || 'ANDROID' });
    let update;
    if (newFirebaseTokens && Array.isArray(newFirebaseTokens)) {
      update = await User.findOneAndUpdate({ _id: reporterId }, {
        firebaseTokens: newFirebaseTokens
      });
    } else {
      update = await User.findOneAndUpdate({ _id: reporterId }, {
        $addToSet: { firebaseTokens: { deviceId: deviceId, token: token, platform: platform || 'ANDROID' }}
      });
    }
    return update;
  }
  catch (e) {
    throw e;
  }
};

userSchema.index({geoLocation: '2dsphere'})

userSchema.pre('save', function (next) {

  if (this.password && this.password !== '') {
    this.password = lib.crypto.hashString(this.password);
  }

  if (this.isVolunteer) {
    this.isBlocked = false
  } else {
    this.isBlocked = true
  }


  return next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
