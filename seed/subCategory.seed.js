const SubCategory = require('../models/SubCategory')
const MainCategory = require('../models/MainCategory')

const data = [
  {
    _id: '5af352c7c38e980014415ea5',
    _mainCategory: '5af3524dc38e980014415e9c',
    name: 'sub eng 2018 05 09 IIa',
    description: null
  },
  {
    _id: '5af352d9c38e980014415ea9',
    _mainCategory: '5af3524dc38e980014415e9c',
    name: 'sub eng 2018 05 09 IIb',
    description: null
  },
  {
    _id: '5af352e6c38e980014415ead',
    _mainCategory: '5af3524dc38e980014415e9c',
    name: 'other',
    description: null
  },
  {
    _id: '5af55f19e0936b0014615dd6',
    _mainCategory: '5af55ee6e0936b0014615dce',
    name: 'large waste',
    description: 'large waste'
  },
  {
    _id: '5af55f28e0936b0014615dda',
    _mainCategory: '5af55ee6e0936b0014615dce',
    name: 'small chemical waste',
    description: 'small chemical waste'
  },
  {
    _id: '5af55f01e0936b0014615dd2',
    _mainCategory: '5af55ee6e0936b0014615dce',
    name: 'waste next to container',
    description: 'waste next to container'
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
