const LanguageHelper = require('../helpers/language.helper')

const __translating = async function (translated, obje, field, code) {
  // key
  const toSearch = obje.toObject()
  const serchText = toSearch[field]

  toSearch['trans'] = serchText
  
  if (!toSearch[field]) {
    /// gago ka null value
    toSearch[field] = toSearch.name
    return Promise.resolve(toSearch)
  }

  if (translated.srch(serchText)) {
   ///  toSearch.name = translated[toSearch.name]toSearch
    toSearch[field] = translated[serchText]
    return Promise.resolve(toSearch)
  } else {
    const record = await LanguageHelper.getTranslation(toSearch.name)
    if (record.translations) {
      const words = record.translations.find(translations => translations.code === code) // get only in by code
      if (words.word) {
        toSearch[field] = translated.insert(serchText, words.word) // translated[serchText] = words.word
       // toSearch.name = translated[toSearch.name]
       // toSearch[field] = serchText
        return Promise.resolve(toSearch)
      }
    }
    toSearch[field] = translated.insert(serchText, serchText)
   // translated[serchText] = toSearch.name
   // toSearch.name = translated[toSearch.name]
  //  serchText

    return Promise.resolve(toSearch)
  }
}

const translate = function (categories, code = 'en') {
  const TransCollection = { // inside: if this outside this will cause memory issue
    srch: function (key) {
      return this['X-' + key]
    },
    insert: function (key, value) {
      this['X-' + key] = value

      return value
    }
  }

  return new Promise(async(resolve, reject) => {
    console.log('categories', categories)

  // check in store if not exist then get item form db
    const result = await Promise.all(categories.map(async function (category, index) {
      return __translating(TransCollection, category, 'name', code)
    })
  )
    console.log('translated: ', TransCollection)
    resolve(result)

  // await Promise.all(

  //   .map(async(mc) => {
  //     const translations = await LanguageHelper.getTranslation(mc.name);
  //     return {...mc.toObject(), translations: translations.translations};
  //   })
  })
  // Promise.resolve(categories)
}

    // const categoriesWithTranslations = await Promise.all(getMC.mainCategories.map(async(mc) => {
    //   const translations = await LanguageHelper.getTranslation(mc.name);
    //   return {...mc.toObject(), translations: translations.translations};
    // }));

module.exports = {
  translate
}
