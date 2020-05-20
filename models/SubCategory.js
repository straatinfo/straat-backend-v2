const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  name: { type: String },
  translations: [{
    code: String,
    word: String
  }],
  description: { type: String },
  softRemoved: { type: Boolean, default: false },
  _mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' }
}, {timestamps: true});

module.exports = mongoose.model('SubCategory', subCategorySchema);
