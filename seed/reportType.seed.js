const ReportType = require('../models/ReportType')

const data = [
  {
    _id: '5a7888bb04866e4742f74955',
    code: 'A',
    name: 'Public Space'
  },
  {
    _id: '5a7888bb04866e4742f74956',
    code: 'B',
    name: 'Safety'
  },
  {
    _id: '5a7888bb04866e4742f74957',
    code: 'C',
    name: 'Communication'
  }
]

const model = function () {
  return ReportType
}

module.exports = {
  model,
  data
}
