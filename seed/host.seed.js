const User = require('../models/User')
const newUser = new User()

const data = [
  {
    _id: '5a7b485a039e2860cf9dd19a',
    hostName: '\'s-Gravenhage',
    email: 'denhaag@straat.info',
    username: 'denhaag',
    streetName: 'Postbus 12600',
    city: '\'s-Gravenhage',
    country: 'Netherlands',
    postalCode: '2500 DJ',
    phoneNumber: '14070',
    _role: '5a75c9de3a06a627a7e8af45',
    password: newUser.encryptPassword('test')
  },
  {
    _id: '5aab870bce08810014422977',
    hostName: 'Vlaardingen',
    email: 'vlaardingen@straat.info',
    username: 'Vlaardingen',
    streetName: 'Postbus 1002',
    city: 'Vlaardingen',
    country: 'Netherlands',
    postalCode: '3130 EB',
    phoneNumber: '(010) 248 40 00',
    _role: '5a75c9de3a06a627a7e8af45',
    password: newUser.encryptPassword('test')
  },
  {
    _id: '5a844e1bf154bc463543b987',
    hostName: 'freeHost',
    email: 'freehost@test.com',
    username: 'freeHost',
    postalCode: '2500 DJ',
    password: newUser.encryptPassword('test'),
    _role: '5a75c9de3a06a627a7e8af45' // should be changed according to _role in db
  },
  {
    // _id: '5a844e1bf154bc463543b987',
    hostName: 'alblasserdam',
    email: 'alblasserdamTest@straat.info',
    username: 'alblasserdam',
    postalCode: '2950 AA',
    password: newUser.encryptPassword('test'),
    _role: '5a75c9de3a06a627a7e8af45' // should be changed according to _role in db
  },
]

const model = function () {
  return User
}

module.exports = {
  model,
  data
}
