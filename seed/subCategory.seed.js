const SubCategory = require('../models/SubCategory')
const MainCategory = require('../models/MainCategory')

const data = [
  {
    _mainCategory: '5a788e456f94354ba0856e66',
    name: 'General'
  }
]

const effect = async function (record) {
  await MainCategory.findByIdAndUpdate(record._mainCategory, { '$push': { 'subCategories': record._id } }, { 'new': true, 'upsert': true })
  return Promise.resolve(true)
}

const model = function () {
  return SubCategory
}

module.exports = {
  model,
  effect,
  data
}
