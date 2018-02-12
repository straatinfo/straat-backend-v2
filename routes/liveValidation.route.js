const express = require('express')
const LiveValidationRoute = express.Router()
const LiveValidation = require('../api/liveValidation');

/**                   REGISTRATION                   */
// return status: 1 if this Email is vacant
LiveValidationRoute.route('/hasUserNotGotThisEmailAddress')
  .post(LiveValidation.validateEmail)

// return status: 1 if this userName is vacant
LiveValidationRoute.route('/hasUserNotGotThisUserName')
  .post(LiveValidation.validateUserName)

// return status: 1 if this postal code is valid
LiveValidationRoute.route('/postalCode')
  .post(LiveValidation.validatePostaCode)

// validation for input mobile Number

// validation for team creation( if input teamName and teamEmail is already in this specific (isVoluteer and host))




/**                   Report                   */
// 




module.exports = LiveValidationRoute  

