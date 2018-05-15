const LanguageHelper = require('../helpers/language.helper')

const TransCollection = function () {        // inside: if this outside this will cause memory issue
  return {
    srch: function (key) {
      return this['X-' + key]
    },
    insert: function (key, value) {
      this['X-' + key] = value
      return value
    }
  }
}

const getItem = function (path, obj) {
  if (!path) { // return if no root given
    return obj
  }

  return path.split('.').reduce(function (prev, curr) {
    return prev ? prev[curr] : false
  }, obj || self)
}

const __translating = async function (translated, obje, root, field, code) {
  // the problem here is how  if fields is object not sstring
  if (!obje) {
    return
  }
  // key
  const toSearch = obje.toObject ? obje.toObject() : obje
 // const serchText = toSearch[field]
  const item = getItem(root, toSearch)       // get define obj

  if (!item || (item && !item[field])) {
    return Promise.resolve(toSearch)
  }
  const serchText = item[field]
  // toSearch['trans'] = serchText           // for test

  if (translated.srch(serchText)) {
    // console.log('exist: ', serchText)
    item[field] = translated.srch(serchText) // set translated to return
    return Promise.resolve(toSearch)
  } else {                                   // no trans in collection so it will query to db
    const record = await LanguageHelper.getTranslation(serchText)
    if (record.translations) {
      const words = record.translations.find(translations => translations.code === code) // get only in by code
      if (words && words.word) {
        item[field] = translated.insert(serchText, words.word)
        // console.log(item[field], ' : ', serchText)
        return Promise.resolve(toSearch)
      }
    }
    item[field] = translated.insert(serchText, serchText)
    return Promise.resolve(toSearch)         // return trans if not found any
  }
}

/**
 * @description translate qurery result
 * @param {_categories} root
 * @param {name} field
 * @param {nl} code
 * @param {dbDoc} model
 * @param {TransCollection} transCollection use in recursive translation
 * @returns {Promises} array of promises
 * @example (reports, '_categories', 'name', 'nl')
 *
 */
const translate = function (model, root, field, code = 'en', transCollection = new TransCollection()) {
  if(!model) {
    return
  }
  if (model.map) {
    return Promise.all(model.map(function (entries, index) {
      return __translating(transCollection, entries, root, field, code)
    }))
  }
 return  __translating(transCollection, model, root, field, code)
}

module.exports = {
  TransCollection,
  translate
}
