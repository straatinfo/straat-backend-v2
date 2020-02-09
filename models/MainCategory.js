const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mainCategorySchema = new Schema({
  name: { type: String, index: true },
  translations: [{
    code: String,
    word: String
  }],
  description: { type: String },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  _reportType: { type: mongoose.Schema.Types.ObjectId, ref: 'ReportType', required: true },
  subCategories: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory'
  }]
}, {timestamps: true})

//
//   methods
//
//

const mini = function (obj) {
  return obj
   .populate('subCategories', ['_id', 'name', 'description'])
   .populate('_reportType', ['_id', 'code', 'name', 'description'])
}
const full = function (obj) {
  return obj.populate(['subCategories', '_reportType'])
}

mainCategorySchema.statics.minifyOne = function (query, isMinify = true, cb) {
  if (isMinify) {
    return mini(
      this.findById(query, {_id: true, name: true, description: true})
    )
  }
  return full(
    this.findById(query, {_id: true, name: true, description: true})
  )
}

mainCategorySchema.statics.minify = function (query, isMinify = true, cb) {
  if (isMinify) {
    return mini(
      this.find(query, {_id: true, name: true, description: true})
    )
  }
  return full(
    this.find(query, {_id: true, name: true, description: true})
  )
}

module.exports = mongoose.model('MainCategory', mainCategorySchema)

// test data
// _id: "5a8ea09d7da9300014cc7496",

// _reportType 5a7888bb04866e4742f74956
