const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designSchema = new Schema({
  designName: { type: String, default: 'General', index: true },
  colorOne: { type: String },
  colorTwo: { type: String },
  colorThree: { type: String },
  colorFour: { type: String },
<<<<<<< HEAD
  logoUrl: String,
  logoSecuredUrl: String,
=======
  url: String,
  secure_url: String,
>>>>>>> 128f8c64d6e5a41adbb3204c31daf429df67a486
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Design', designSchema);
