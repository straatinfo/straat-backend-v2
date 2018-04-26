const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const languageSchema = new Schema({
  baseWord: { type: String, unique: true, required: true },
  translations: [{
    code: String,
    word: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Language', languageSchema);
