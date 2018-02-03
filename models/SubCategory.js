const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  name: { type: String },
  description: { type: String },
  mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory' },
  reports: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Report'
  }]
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
