const User = require('../models/User')
const newUser = new User()

const data = [
  {
    email: 'admin@straat.info',
    username: 'admin',
    postalCode: 'test',
    _role: '5a75c9de3a06a627a7e8af44',
    password: newUser.encryptPassword('admin')
  },
  {
    email: 'johnhiggins.avila@gmail.com',
    username: 'adminJohn',
    postalCode: '11119',
    _role: '5a75c9de3a06a627a7e8af44',
    password: newUser.encryptPassword('admin')
  }
]

const model = function () {
  return User
}

module.exports = {
  model,
  data
}
