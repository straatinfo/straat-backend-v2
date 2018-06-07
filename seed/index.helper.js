const Config = require('../config')
var mongoose = require('mongoose')

const _connect = function (option = false) {
  if (option) {
    mongoose.connect(Config.DATA_BASE)
  } else {
    mongoose.disconnect()
  }
}

const _insertMany = async function (input) {
  const inserted = await input.model().insertMany(input.data)
  return Promise.resolve(inserted)
}

const _insertEffects = async function (data) {
  const currentModel = data.model()
  let inserted = []
  for (let c = 0; c < data.data.length; c++) {
    const saving = await currentModel.create(data.data[c])
    await data.effect(saving)
    inserted.push(inserted)
  }
  return Promise.resolve(inserted)
}

const run = async function () {
  const args = arguments
  _connect(true)

  try {
    for (let arg = 0; arg < args.length; arg++) {
      if (args[arg].effect) {
        // has some effects: child of something
        const insertEff = await _insertEffects(args[arg])
        console.log('inserted: ', insertEff)
      } else {
        // pure record
        const inserted = await _insertMany(args[arg])
        console.log('inserted: ', inserted)
      }
    }
  } catch (error) {
    console.log(error)
  }
  _connect(false)
}

module.exports = {
  run
}
