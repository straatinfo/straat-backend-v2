const Role = require('../models/Role')

const data = [
  {
    _id: '5a75c9de3a06a627a7e8af44',
    name: 'Admin',
    code: 'ADMIN',
    accessLevel: 1
  },
  {
    _id: '5a75c9de3a06a627a7e8af45',
    name: 'Host',
    code: 'HOST',
    accessLevel: 2
  },
  {
    _id: '5a75c9de3a06a627a7e8af46',
    name: 'User',
    code: 'USER',
    accessLevel: 3
  }
]

const model = function () {
  return Role
}

module.exports = {
  model,
  data
}
