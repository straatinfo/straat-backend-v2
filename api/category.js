const CategoryHelper = require('../helpers/category.helper')
const ErrorHelper = require('../helpers/error.helper')
const SuccessHelper = require('../helpers/success.helper')
const LanguageHelper = require('../helpers/language.helper')

const getMainCategories = async (req, res, next) => {
  const { hostId } = req.params
  const code = req.query.code || 'A'
  try {
    const getMC = await CategoryHelper.getMainCategories(hostId, code)
    if (getMC.err) {
      return ErrorHelper.ClientError(res, {error: getMC.err}, 400)
    }
    const categoriesWithTranslations = await Promise.all(getMC.mainCategories.map(async(mc) => {
      const translations = await LanguageHelper.getTranslation(mc.name)
      return {...mc.toObject(), translations: translations.translations}
    }))
    console.log(categoriesWithTranslations)
    if (req.query.flat == 'true') {
      req.mainCategories = categoriesWithTranslations
      return next()
    }
    SuccessHelper.success(res, categoriesWithTranslations)
  } catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const getMainCategoriesWithGeneral = async (req, res, next) => {
  // !removed general
  // get all categories of this _host
  // use by app
  const { hostId } = req.params
  try {
    const getMC = await CategoryHelper.getMainCategoriesByHost(hostId)
    if (getMC.err) {
      return ErrorHelper.ClientError(res, {error: getMC.err}, 400)
    }
    const categoriesWithTranslations = await Promise.all(getMC.mainCategories.map(async(mc) => {
      const translations = await LanguageHelper.getTranslation(mc.name)
      return {...mc.toObject(), translations: translations.translations}
    }))
    if (req.query.flat == 'true') {
      req.mainCategories = categoriesWithTranslations
      // return next()
    } else {
      req.mainCategories = getMC.mainCategories
    }
    // SuccessHelper.success(res, categoriesWithTranslations)
    return next()

  } catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const getGeneralMainCategories = async (req, res, next) => {
  try {
    if (!req.query.code) { return ErrorHelper.ClientError(res, {error: 'Invalid Code'}, 422) }
    const code = req.query.code.toUpperCase()
    let getMC
    switch (code) {
      case 'A':
        getMC = await CategoryHelper.getGeneralMainCategoriesByReportTypeCode('A')
        break
      case 'B':
        getMC = await CategoryHelper.getGeneralMainCategoriesByReportTypeCode('B')
        break
      case 'C':
        getMC = await CategoryHelper.getGeneralMainCategoriesByReportTypeCode('C')
        break
      case 'ABC':
        // get all categoriees of general
        getMC = await CategoryHelper.getMainCategoriesGeneral()
         
        break
      default:
        return ErrorHelper.ClientError(res, {error: 'Invalid Code'}, 422)
    }

    if (getMC.err) { return ErrorHelper.ClientError(res, {error: getMC.err}) }
    const categoriesWithTranslations = await Promise.all(getMC.mainCategories.map(async(mc) => {
      const translations = await LanguageHelper.getTranslation(mc.name)
      return {...mc.toObject(), translations: translations.translations}
    }))

    console.log(categoriesWithTranslations);
    // const categoriesWithTranslations =  getMC
    if (req.query.flat == 'true') {
      req.mainCategories = categoriesWithTranslations;
    } else {
      req.mainCategories = getMC.mainCategories
    }
    if (getMC.err) { return ErrorHelper.ClientError(res, {error: getMC.err}, 422) }
    return next();
    // SuccessHelper.success(res, categoriesWithTranslations)
  } catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res)
  }
}

const createGeneralMainCategory = async (req, res, next) => {
  try {
    const { code, name, description } = req.body
    if (!code || !name) { return ErrorHelper.ClientError(res, {error: 'Invalid Inputs'}) }
    const createGMC = await CategoryHelper.createMainCategoryForGeneralDesign({name, code, description})
    if (createGMC.err) { return ErrorHelper.ClientError(res, {error: createGMC.err}) }
    const translations = await LanguageHelper.getTranslation(createGMC.mainCategory.name)
    if (req.query.flat == 'true') {
      const flatMC = await CategoryHelper.flatMainCategory({...createGMC.mainCategory.toObject(), translations: translations.translations})
      if (flatMC.err) { return ErrorHelper.ClientError(res, {error: flatMC.err}) }
      return SuccessHelper.success(res, flatMC.mainCategory)
    }
    SuccessHelper.success(res, {...createGMC.mainCategory.toObject(), translations: translations.translations})
  } catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const createMainCategory = async (req, res, next) => {
  const { hostId } = req.params
  const { name, description, _reportType } = req.body
  try {
    const input = {'name': name, 'description': description, '_reportType': _reportType, '_host': hostId}
    const createMC = await CategoryHelper.createMainCategory(input)
    if (createMC.err) {
      return resolve({err: createMC.err})
    }
    if (!createMC.mainCategory) { return ErrorHelper.ClientError(res, {error: 'Invalid Inputs'}, 422) }
    const translations = await LanguageHelper.getTranslation(createMC.mainCategory.name)
    if (req.query.flat == 'true') {
      const flatMC = await CategoryHelper.flatMainCategory({...createMC.mainCategory.toObject(), translations: translations.translations})
      if (flatMC.err) { return ErrorHelper.ClientError(res, {error: 'Cannot get MainCategory'}) }
      return SuccessHelper.success(res, flatMC.mainCategory)
    }
    SuccessHelper.success(res, {...createMC.mainCategory.toObject(), translations: translations.translations})
  } catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const updateMainCategory = async (req, res, next) => {
  const { mainCategoryId } = req.params
  try {
    const updateMC = await CategoryHelper.updateMainCategory(mainCategoryId, req.body)
    if (updateMC.err) {
      return ErrorHelper.ClientError(res, { error: updateMC.errr}, 400)
    }
    if (!updateMC.mainCategory) { return ErrorHelper.ClientError(res, {error: 'Invalid Inputs'}, 422) }
    const translations = await LanguageHelper.getTranslation(updateMC.mainCategory.name)
    if (req.query.flat == 'true') {
      const flatMC = await CategoryHelper.flatMainCategory({...updateMC.mainCategory.toObject(), translations: translations.translations})
      if (flatMC.err) { return ErrorHelper.ClientError(res, {error: 'Cannot get MainCategory'}) }
      return SuccessHelper.success(res, flatMC.mainCategory)
    }
    SuccessHelper.success(res, {...updateMC.mainCategory.toObject(), translations: translations.translations})
  } catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const getMainCategoriesByReportType = async (req, res, next) => {
  const { reportTypeId } = req.params
  try {
    const getMCBRT = await CategoryHelper.getMainCategoriesByReportType(reportTypeId)
    if (getMCBRT.err) {
      return ErrorHelper.ClientError(res, {error: getMCBRT.err}, 400)
    }
    const categoriesWithTranslations = await Promise.all(getMCBRT.mainCategories.map(async(mc) => {
      const translations = await LanguageHelper.getTranslation(mc.name)
      return {...mc.toObject(), translations: translations.translations}
    }))
    if (req.query.flat == 'true') {
      req.mainCategories = categoriesWithTranslations
      return next()
    }
    SuccessHelper.success(res, categoriesWithTranslations)
  } catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const deleteMainCategory = async (req, res, next) => {
  const { mainCategoryId } = req.params
  try {
    const deleteMC = await CategoryHelper.deleteMainCategory(mainCategoryId)
    if (deleteMC.err) {
      return ErrorHelper.ClientError(res, {error: deleteMC.err}, 400)
    }
    SuccessHelper.success(res, deleteMC.mainCategory)
  } catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const getSubCategories = async (req, res, next) => {
  const { mainCategoryId } = req.params
  try {
    const getSC = await CategoryHelper.getSubCategories(mainCategoryId)
    if (getSC.err) {
      return ErrorHelper.ClientError(res, { err: getSC.err}, 400)
    }
    const scWithTranslation = await Promise.all(getSC.subCategories.map(async(sc) => {
      const translations = await LanguageHelper.getTranslation(sc.name)
      return {...sc.toObject(), translations: translations.translations}
    }))
    if (req.query.flat == 'true') {
      req.subCategories = scWithTranslation
      return next()
    }
    SuccessHelper.success(res, scWithTranslation)
  } catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const createSubCategory = async (req, res, next) => {
  const { mainCategoryId } = req.params
  const { name, description } = req.body
  try {
    const input = {'_mainCategory': mainCategoryId, name, description}
    const createSC = await CategoryHelper.createSubcategory(input)
    if (createSC.err) {
      return ErrorHelper.ClientError(res, { err: createSC.err }, 400)
    }
    if (!createSC.subCategory) { return ErrorHelper.ClientError(res, {error: 'Invalid Input'}, 422) }
    const translations = await LanguageHelper.getTranslation(createSC.subCategory.name)
    if (req.query.flat == 'true') {
      const flatSC = await CategoryHelper.flatSubCategory({...createSC.subCategory.toObject(), translations: translations.translations})
      if (flatSC.err) { return ErrorHelper.ClientError(res, {error: 'Cannot get SubCategory'}, 400) }
      return SuccessHelper.success(res, flatSC.subCategory)
    }
    SuccessHelper.success(res, {...createSC.subCategory.toObject(), translations: translations.translations})
  } catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const updateSubCategory = async (req, res, next) => {
  const { subCategoryId } = req.params
  try {
    const updateSC = await CategoryHelper.updateSubCategory(subCategoryId, req.body)
    if (updateSC.err) {
      return ErrorHelper.ClientError(res, {error: updateSC.err}, 400)
    }
    if (!updateSC.subCategory) { return ErrorHelper.ClientError(res, {error: 'Invalid Input'}, 422) }
    const translations = await LanguageHelper.getTranslation(updateSC.subCategory.name)
    if (req.query.flat == 'true') {
      const flatSC = await CategoryHelper.flatSubCategory({...updateSC.subCategory.toObject(), translations: translations.translations})
      if (flatSC.err) { return ErrorHelper.ClientError(res, {error: 'Cannot get SubCategory'}, 400) }
      return SuccessHelper.success(res, flatSC.subCategory)
    }
    SuccessHelper.success(res, {...updateSC.subCategory.toObject(), translations: translations.translations})
  } catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res)
  }
}

const deleteSubCategory = async (req, res, next) => {
  const { subCategoryId } = req.params
  try {
    const deleteSC = await CategoryHelper.deleteSubCategory(subCategoryId)
    if (deleteSC.err) {
      return ErrorHelper.ClientError(res, { error: deleteSC.err}, 400)
    }
    SuccessHelper.success(res, deleteSC.subCategory)
  } catch (e) {
    ErrorHelper.ServerError(res)
  }
}

const createMainCategoryForHost = async (req, res, next) => {
  try {
    const _host = req.params.hostId
    const { code, name, description } = req.body
    if (!code || !name) { return ErrorHelper.ClientError(res, {error: 'Invalid Inputs'}) }
    const createGMC = await CategoryHelper.createMainCategoryForHost({name, code, description}, _host)
    if (createGMC.err) { return ErrorHelper.ClientError(res, {error: createGMC.err}) }
    const translations = await LanguageHelper.getTranslation(createGMC.mainCategory.name)
    if (req.query.flat == 'true') {
      const flatMC = await CategoryHelper.flatMainCategory({...createGMC.mainCategory.toObject(), translations: translations.translations})
      if (flatMC.err) { return ErrorHelper.ClientError(res, {error: flatMC.err}) }
      return SuccessHelper.success(res, flatMC.mainCategory)
    }
    SuccessHelper.success(res, {...createGMC.mainCategory, translations: translations.translations})
  } catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res)
  }
}

module.exports = {
  getMainCategories: getMainCategories,
  createMainCategory: createMainCategory,
  updateMainCategory: updateMainCategory,
  deleteMainCategory: deleteMainCategory,
  getSubCategories: getSubCategories,
  createSubCategory: createSubCategory,
  updateSubCategory: updateSubCategory,
  deleteSubCategory: deleteSubCategory,
  getMainCategoriesByReportType: getMainCategoriesByReportType,
  getMainCategoriesWithGeneral: getMainCategoriesWithGeneral,
  getGeneralMainCategories: getGeneralMainCategories,
  createGeneralMainCategory: createGeneralMainCategory,
  createMainCategoryForHost: createMainCategoryForHost
}
