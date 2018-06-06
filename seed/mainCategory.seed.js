const MainCategory = require('../models/MainCategory')
const ReportType = require('../models/ReportType')
const User = require('../models/User')

const data = [
  {
    _id: '5a788e456f94354ba0856e66',
    _host: '5a844e1bf154bc463543b987',
    _reportType: '5a7888bb04866e4742f74955',
    name: 'General'
  }
]

const effect = async function (record) {
  await ReportType.findByIdAndUpdate(record._reportType, { '$push': { 'mainCategories': record._id } }, { 'new': true, 'upsert': true })
  /****/await User.findByIdAndUpdate(record._host, /****/{ '$push': { 'mainCategories': record._id } }, { 'new': true, 'upsert': true })
  return Promise.resolve(true)
}

const model = function () {
  return MainCategory
}

module.exports = {
  model,
  effect,
  data
}
