const express = require('express')
const LiveValidationRoute = express.Router()
const LiveValidation = require('../api/liveValidation');


// return status: 1 if this Email is vacant
LiveValidationRoute.route('/hasUserNotGotThisEmailAddress')
  .post(LiveValidation.validateEmail)

// return status: 1 if this userName is vacant
LiveValidationRoute.route('/hasUserNotGotThisUserName')
  .post(LiveValidation.validateUserName)

// return status: 1 if this postal code is valid
LiveValidationRoute.route('/postalCode')
  .post(LiveValidation.validatePostaCode)

module.exports = LiveValidationRoute  

