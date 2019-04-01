const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  name: { type: String },
  translations: [{
    code: String,
    word: String
  }],
  description: { type: String },
  _mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' },
  reports: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Report'
  }]
}, {timestamps: true});

module.exports = mongoose.model('SubCategory', subCategorySchema);
