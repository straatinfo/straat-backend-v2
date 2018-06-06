const User = require('../models/User')
const newUser = new User()

const data = [
  {
    hostName: 'test Host 3',
    email: 'testHost3@straat.info',
    username: 'testHost3',
    streetName: 'Postbus 12600',
    city: 'S-GRAVENHAGE',
    country: 'Netherlands',
    postalCode: '2500 DJ',
    phoneNumber: '14070',
    _role: '5a75c9de3a06a627a7e8af45',
    password: newUser.encryptPassword('test')
  }
]

const model = function () {
  return User
}

module.exports = {
  model,
  data
}
