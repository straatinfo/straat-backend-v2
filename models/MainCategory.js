const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mainCategorySchema = new Schema({
  name: { type: String, index: true },
  description: { type: String },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  _reportType: { type: mongoose.Schema.Types.ObjectId, ref: 'ReportType', required: true },
  reports: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Report'
  }],
  subCategories: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory'
  }]
}, {timestamps: true})

mainCategorySchema.statics.Filter = function (filter, isMinify = true, cb) {
  if (isMinify) {
    return this.find(filter, {_id: true, name: true, description: true})
    .populate('subCategories', ['_id', 'name', 'description'])
    .populate('_reportType', ['_id', 'code', 'name', 'description'])
  }
  return this.find(filter)
    .populate(['subCategories', '_reportType'])
}

module.exports = mongoose.model('MainCategory', mainCategorySchema)

// test data
// _id: "5a8ea09d7da9300014cc7496",

// _reportType 5a7888bb04866e4742f74956
