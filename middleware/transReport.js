const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const ReportHelper = require('../helpers/report.helper');

const Translator = require('./../middleware/translator');
const Languages = require('./../assets/jsonfiles/constants').Langauges

const translate = async (req, res, next) => {
  let { reports: result } = req
  const { language, flat } = req.query

  try {
    if (!result) {
      return ErrorHelper.ClientError(res, {error: 'no reports'}, 400);
    }

    if (Languages[language]) {
      console.log('  trans')
      const transCollection = new Translator.TransCollection()
      result = await Translator.translate(result, '_mainCategory', 'name', language, transCollection)
      result = await Translator.translate(result, '_subCategory', 'name', language, transCollection)
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
