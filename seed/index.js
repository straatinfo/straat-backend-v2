
const Config = require('../config')
var mongoose = require('mongoose')

const connect = function (option = false) {
  if (option) {
    mongoose.connect(Config.DATA_BASE)
  } else {
    mongoose.disconnect()
  }
}

const insert = async function (input) {
  const inserted = await input.model().insertMany(input.data)
  return Promise.resolve(inserted)
}

const run = async function () {
  const args = arguments
  connect(true)

  try {
    for (let arg = 0; arg < args.length; arg++) {
      const inserted = await insert(args[arg])
      console.log('inserted: ', inserted)
    }
  } catch (error) {
    console.log(error)
  }
  connect(false)
}

// ---------------------------------------------------------------------------------------------------------
const hostSeed = require('./host.seed')

/**
 *
 * @description this will be migrated to db for current connection
 *
 */
run(
  hostSeed
)
