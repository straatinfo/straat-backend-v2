const User = require('../models/User')
const newUser = new User()

const data = [
  {
    _id: '5a7b485a039e2860cf9dd19a',
    hostName: 'Gemeente Den Haag',
    email: 'denhaag@straat.info',
    username: 'Gemeente Den Haag',
    streetName: 'Postbus 12600',
    city: 'S-GRAVENHAGE',
    country: 'Netherlands',
    postalCode: '2500 DJ',
    phoneNumber: '14070',
    _role: '5a75c9de3a06a627a7e8af45',
    password: newUser.encryptPassword('test')
  },
  {
    _id: '5a844e1bf154bc463543b987',
    hostName: 'freeHost',
    email: 'freehost@test.com',
    username: 'freeHost',
    postalCode: '2500 DJ',
    _role: '5a75c9de3a06a627a7e8af45' // should be changed according to _role in db
  }
]

const model = function () {
  return User
}

module.exports = {
  model,
  data
}
