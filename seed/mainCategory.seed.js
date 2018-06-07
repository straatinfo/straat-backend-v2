const MainCategory = require('../models/MainCategory')
const ReportType = require('../models/ReportType')
const User = require('../models/User')

const data = [
  {
    _id: '5af35350c38e980014415eb4',
    name: 'main eng 2018 05 09 B I',
    description: '',
    _reportType: '5a7888bb04866e4742f74956',
    _host: '5a844e1bf154bc463543b987'
  },
  {
    _id: '5af3536bc38e980014415eb5',
    name: 'main eng 2018 05 09 B II',
    description: '',
    _reportType: '5a7888bb04866e4742f74956',
    _host: '5a844e1bf154bc463543b987'
  },
  {
    _id: '5af35296c38e980014415ea1',
    name: 'main eng 2018 05 09 III',
    description: '',
    _reportType: '5a7888bb04866e4742f74955',
    _host: '5a844e1bf154bc463543b987'
  },
  {
    _id: '5af3524dc38e980014415e9c',
    name: 'main eng 2018 05 09 I',
    description: '',
    _reportType: '5a7888bb04866e4742f74955',
    _host: '5a844e1bf154bc463543b987'
  },
  {
    _id: '5af352f8c38e980014415eb0',
    name: 'other',
    description: '',
    _reportType: '5a7888bb04866e4742f74955',
    _host: '5a844e1bf154bc463543b987'
  },
  {
    _id: '5af3537bc38e980014415eb9',
    name: 'other',
    description: '',
    _reportType: '5a7888bb04866e4742f74956',
    _host: '5a844e1bf154bc463543b987'
  },
  {
    _id: '5af35433c38e980014415ec5',
    name: 'main eng 2018 05 09 C III',
    description: '',
    _reportType: '5a7888bb04866e4742f74957',
    _host: '5a844e1bf154bc463543b987'
  },
  {
    _id: '5af35440c38e980014415eca',
    name: 'other',
    description: '',
    _reportType: '5a7888bb04866e4742f74957',
    _host: '5a844e1bf154bc463543b987'
  },
  {
    _id: '5af55ee6e0936b0014615dce',
    name: 'waste',
    description: 'Waste',
    _reportType: '5a7888bb04866e4742f74955',
    _host: '5a844e1bf154bc463543b987'
  },
  {
    _id: '5af3541dc38e980014415ec4',
    name: 'main eng 2018 05 09 C II',
    description: '',
    _reportType: '5a7888bb04866e4742f74957',
    _host: '5a844e1bf154bc463543b987'
  },
  {
    _id: '5b0c4cfed01f840014d7d741',
    name: 'main A eng 20180528 I',
    description: '',
    _reportType: '5a7888bb04866e4742f74955',
    _host: '5a844e1bf154bc463543b987'
  },
  {
    _id: '5af3527ec38e980014415ea0',
    name: 'main eng 2018 05 09 II',
    description: '',
    _reportType: '5a7888bb04866e4742f74955',
    _host: '5a844e1bf154bc463543b987'
  },
  {
    _id: '5af353eec38e980014415ebb',
    name: 'main eng 2018 05 09 C I',
    description: '',
    _reportType: '5a7888bb04866e4742f74957',
    _host: '5a844e1bf154bc463543b987'
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
