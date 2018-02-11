const ErrorHelper = require('../helpers/error.helper');
const SuccessHelper = require('../helpers/success.helper');
const LivevalidationHelper = require('../helpers/liveValidation.helper');


const validateEmail = async (req, res, next) => {
  const { userEmail } = req
  try {
    const isValidEmail = LivevalidationHelper.validateEmail(userEmail)

    if (isValidEmail.err) {
      return ErrorHelper.ClientError(res, {error: isValidEmail.err}, 400)
    }
    SuccessHelper.success(res, isValidEmail)
  }
  catch (e) {
    ErrorHelper.ServerError(res)
  }
}
const validateUserName = async (req, res, next) => {
  const pogi = 'ang pogi ko talga'
  try {
    const isValidEmail = LivevalidationHelper.validateEmail(pogi) // katamad mag copy editin mona to 

    if (isValidEmail.err) {
      return ErrorHelper.ClientError(res, {error: isValidEmail.err}, 400)
    }
    SuccessHelper.success(res, isValidEmail)
  }
  catch (e) {
    ErrorHelper.ServerError(res)
  }
}
const validatePostaCode = async (req, res, next) => {
  const pogi = 'ang pogi ko talga'
  try {
    const isValidEmail = LivevalidationHelper.validateEmail(pogi) // palgay ko mas ok kung server side mag validated nito baka may pag gamitan ng data nito pag tagal

    if (isValidEmail.err) {
      return ErrorHelper.ClientError(res, {error: isValidEmail.err}, 400)
    }
    SuccessHelper.success(res, isValidEmail)
  }
  catch (e) {
    ErrorHelper.ServerError(res)
  }
}

module.exports = {
  validateEmail,
  validateUserName,
  validatePostaCode

}
