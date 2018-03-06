const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socketSchema = new Schema({
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  _socket: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Socket', socketSchema);
