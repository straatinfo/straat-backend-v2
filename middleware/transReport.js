const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const ReportHelper = require('../helpers/report.helper');

const Translator = require('./../middleware/translator');
const Languages = require('./../assets/jsonfiles/constants').Langauges

const _ = require('lodash');

const internals = {};

internals.tranlateMainAndSub = (object, lang) => {
  const data = object.toObject ? object.toObject() : object;

  console.log('DATA TO TEST', data)

  const _mainCategory = data._mainCategory;
  const _subCategory = data._subCategory;

  const mainTran = _.find(_mainCategory.translations, (t) => { return t.code == lang });

  let subTran;
  
  if (_subCategory) {
    subTran = _.find(_subCategory.translations, (t) => { return t.code == lang });
  }


  if (mainTran) {
    _mainCategory.name = mainTran.word;
  }

  if (subTran) {
    _subCategory.name = subTran.word;
  }

  data._mainCategory = _mainCategory;
  data._subCategory = _subCategory;

  return data;
};





const translate = async (req, res, next) => {
  let { reports: result } = req
  const { language = 'nl', flat } = req.query

  try {
    if (!result) {
      return ErrorHelper.ClientError(res, {error: 'no reports'}, 400);
    }

    // if (Languages[language]) {
    //   console.log('  trans')
    //   const transCollection = new Translator.TransCollection()
    //   result = await Translator.translate(result, '_mainCategory', 'name', language, transCollection)
    //   result = await Translator.translate(result, '_subCategory', 'name', language, transCollection)
    // }

    if (language.toLowerCase() == 'nl') {
      if (result.map) result = result.map(r => internals.tranlateMainAndSub(r, language));
      if (!result.map) result = internals.tranlateMainAndSub(result, language);
    }

    if (flat == 'true') {
      req.reports = result;
      return next();
    }

    return SuccessHelper.success(res, result);
  }
  catch (e) {
    console.log(e.message)
    ErrorHelper.ServerError(res);
  }
};

const translateOnly = async (req, res, next) => {
  let { result } = req
  const { language, flat } = req.query
  
  try {
    if (!result) {
      return ErrorHelper.ClientError(res, {error: 'no reports'}, 400);
    }
 
console.log('result', result)
    if (Languages[language]) {
      const transCollection = new Translator.TransCollection()
      result = await Translator.translate(result, '_mainCategory', 'name', language, transCollection)
      result = await Translator.translate(result, '_subCategory', 'name', language, transCollection)
    }
    
    // dint not handle middleware for report
    // if (flat) {
    //   req.reports = result;
    //   return next();
    // }

    return SuccessHelper.success(res, result);
  }
  catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res);
  }
};


module.exports = {
  translate,     // tranlate array     
  translateOnly  // tranlate single record
};
