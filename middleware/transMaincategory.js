const ErrorHelper = require('../helpers/error.helper')
const SuccessHelper = require('../helpers/success.helper')

const Translator = require('./../middleware/translator')
const Languages = require('./../assets/jsonfiles/constants').Langauges

const translate = async (req, res, next) => {
  let { mainCategories: result } = req
  const { language, flat } = req.query

  try {
    if (!result) {
      return ErrorHelper.ClientError(res, {error: 'no Categories'}, 400)
    }

    if (Languages[language]) {
      console.log('  trans', result)
      const transCollection = new Translator.TransCollection()

      // translate main cat
      result = await Translator.translate(result, '', 'name', language, transCollection)

      // translate it sub cat
      // this need to trans with sub cause in app it uses main and child sub directly

      result = await Promise.all(result.map(
          async function (cat, index) {
            if (cat.subCategories && cat.subCategories.map && cat.subCategories.length) {
              cat.subCategories = await Translator.translate(cat.subCategories, '', 'name', language, transCollection)
              return cat
            } else {
              return cat
            }
          }
        ))
    }

    if (flat == 'true') {
      req.mainCategories = result // must not adapt in the future
      return next()
    }

    return SuccessHelper.success(res, result)
  }  catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res)
  }
}

const translateOnly = async (req, res, next) => {
  const { reports } = req
  const { language, flat } = req.query

  try {
    if (!req.reports) {
      return ErrorHelper.ClientError(res, {error: 'no reports'}, 400)
    }

    let result = reports

    if (Languages[language]) {
      console.log('  trans')
      const transCollection = new Translator.TransCollection()
      result = await Translator.translate(reports, '_mainCategory', 'name', language, transCollection)
      result = await Translator.translate(result, '_subCategory', 'name', language, transCollection)
    }

    if (flat) {
      req.reports = result
      return next()
    }

    return SuccessHelper.success(res, result)
  }  catch (e) {
    ErrorHelper.ServerError(res)
  }
}


module.exports = {
  translate,     // tranlate array
  translateOnly  // tranlate single record
}
