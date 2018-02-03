const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  code: { type: String, unique: true },
  name: { type: String },
  description: { type: String },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
