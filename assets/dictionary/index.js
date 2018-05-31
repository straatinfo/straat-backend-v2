const lanuages = require('./../jsonfiles/constants').Langauges

const en = require('./en')
const nl = require('./nl')

const L = (code, term) => {
  if (code === lanuages.en) {
    return en[term]
  }

  if (code === lanuages.nl) {
    return nl[term]
  }
  return null
}

module.exports = L
