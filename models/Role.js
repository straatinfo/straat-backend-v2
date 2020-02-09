const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  accessLevel: { type: Number, default: 3 },
  description: { type: String }
}, {timestamps: true});

module.exports = mongoose.model('Role', roleSchema);
