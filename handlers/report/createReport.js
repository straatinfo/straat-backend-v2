const Languages = require('../../assets/jsonfiles/constants').Langauges;
const Translator = require('../../middleware/translator');
const SuccessHelper = require('../../helpers/success.helper');
const internals = {};

internals.catchError = (err, req, res) => {
  console.log(err);
  return res.status(500).send({
    status: 'ERROR',
    statusCode: 100,
    httpCode: 500,
    message: 'Internal Server Error'
  });
};

function checkReportDuplicate (req, res, next) {
  return req.db.Report.findOne(req.body)
    .populate('_reportType', ['_id', 'code', 'name', 'description'])
    .populate('_reporter', ['_id', 'username', 'email', 'language'])
    .populate('_mainCategory', ['_id', 'name', 'description', 'translations'])
    .populate('_subCategory', ['_id', 'name', 'description', 'translations'])
    .populate('_host', ['_id', 'hostName', 'email', 'language'])
    .populate('_team', ['_id', 'teamName', 'teamEmail'])
    .populate({ 
      path: '_conversation',
      select: {messages: true, _id: true}
    })
    .populate('attachments', ['_id', 'secure_url'])
    .then(async (report) => {
      if (report) {
        let result = report
    
        if (Languages[lang]) {
          const transCollection = new Translator.TransCollection()
          result = await Translator.translate(result, '_mainCategory', 'name', lang, transCollection)
          result = await Translator.translate(result, '_subCategory', 'name', lang, transCollection)
        }
        return SuccessHelper.success(res, result);
      }

      return next();
    })
    .catch(e => internals.catchError(e, req, res));
}

module.exports = {
  checkReportDuplicate
};