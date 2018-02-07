const SendGridService = require('../service/sendgrid.service');
const Config = require('../config');

const sendRegistrationRequestNotif = (userDetail) => {
  const { fname, lname, email, message } = userDetail;
  const receiver = Config.EMAIL_ADDRESSES.STRAAT_INFO_EMAIL;
  const subject = 'Request for access';
  const mailBody = `<p>Greetings!</p><br/><p>A new user is requesting for an access code.<p/><p>User Details:<p/><p>Email: ${email}<p/><p>Firstname: ${fname}<p/><p>Lastname: ${lname} </p><br /><p>Sincerely,<p>Straat.info-team</p>`;
  return new Promise(async(resolve, reject) => {
    try {
      const sendBasicMail = await SendGridService.basicMail('newteamrequest@straat.info', receiver, subject, mailBody);
      if (sendBasicMail.err) {
        return resole({err: sendBasicMail.err});
      }
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  sendRegistrationRequestNotif: sendRegistrationRequestNotif
};
