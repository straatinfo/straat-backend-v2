const ErrorHelper = require('../helpers/error.helper')
const SuccessHelper = require('../helpers/success.helper')
const HostHelper = require('../helpers/host.helper')
const DesignHelper = require('../helpers/design.helper')
const UserHelper = require('../helpers/user.helper')
const MailHelper = require('../helpers/mailing.helper')
const CodeGenerator = require('node-code-generator')
const generator = new CodeGenerator()
const pattern = '************'
const hostList = require('../assets/jsonfiles/HostList_2018_4_17')
const _ = require('lodash')
const HostMigrationHelper = require('../helpers/hostMigration.helper')
const TeamTransform = require('../transform/team.transform')

/**
 *
 * @description use for migration of host xls to db
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 */
const migrate = async (req, res, next) => {
  let success = []
  let failed = []
  let result = []
  try {
    await Promise.all(hostList.fullHostList.map(async(host, index) => {
      const saving = await HostMigrationHelper.create(host)
      if (saving.err) {
        failed.push(host)
        result.push(HostMigrationHelper.toHtml(host, 'red'))
      }
      success.push(host)
      result.push(HostMigrationHelper.toHtml(host, 'gray'))
    }))

    return res.send(result.join(''))
    // SuccessHelper.success(res, success, failed)
  } catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res)
  }
}
/**
 *
 * @description getting desame key from hostList
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const intersect = async (req, res, next) => {
  let success = {}
  let result = []
  let pair = []

  try {
    // const hosts = HostMigrationHelper.getKey(hostList.fullHostList, 'hostName')
    hostList.fullHostList.map((host, index) => {
      if (!success['K-' + host.cityName]) {
        success['K-' + host.cityName] = true
        return true
      }
      pair.push(host)
      result.push(HostMigrationHelper.toHtml(host, 'gray'))
      return true
    })

    return res.send(result.join(''))
  } catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res)
  }
}

const validateCity = async (req, res, next) => {
  try {
    const { city } = req.params
    const host = await HostMigrationHelper.validateCity(city)
    if (!host) {
      return ErrorHelper.ClientError(res, {error: 'invalid city 1 '}, 400)
    }
    return SuccessHelper.success(res, {host: host})
  } catch (e) {
    console.log(e)
    ErrorHelper.ServerError(res)
  }
}
// const migrate = async (req, res, next) => {
//   try {
//     console.log(req.query)
//     const { email } = req.query
//     const checkU = await UserHelper.checkUserByCredentials(email)

//     if (checkU.err) {
//       return ErrorHelper.ClientError(res, {error: checkU.err}, 400)
//     }
//     if (!checkU.user) {
//       return ErrorHelper.ClientError(res, {error: 'Invalid email'}, 400)
//     }
//     const userEmail = checkU.user.email
//     const code = generator.generateCodes(pattern, 1)
//     const newPassword = code[0]
//     const forgotP = await UserHelper.deactivateUser(userEmail, newPassword)
//     if (forgotP.err) {
//       return ErrorHelper.ClientError(res, {error: forgotP.err}, 400)
//     }
//     // send email for the to notify deactivation to be discussed
//     // const sendMail = await MailHelper.activateHostNotif(userEmail, newPassword);
//     // if (sendMail.err) {
//     //   return ErrorHelper.ClientError(res, {error: sendMail.err}, 400);
//     // }
//     SuccessHelper.success(res, {message: 'Successfully deactivated the host'})
//   }  catch (e) {
//     ErrorHelper.ServerError(res)
//   }
// }

module.exports = {
  migrate,
  intersect,
  validateCity
}
