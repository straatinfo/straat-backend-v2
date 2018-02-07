const sgMail = require('@sendgrid/mail');
const Config = require('../config');
const basicMail = (sender = 'Straat.info No reply', receiver, subject, message) => {
  return new Promise(async(resolve, reject) => {
    const msg = {
      to: receiver,
      from: sender,
      subject: subject,
      html: message
    };
    try {
      sgMail.setApiKey(Config.SENDGRID.SENDGRID_API_KEY);
      const mailResponse = await sgMail.send(msg);
      if (!mailResponse) {
        return resolve({err: 'Cannot send email'});
      }
      resolve({err: null, message: `Success` });
    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  basicMail: basicMail
};
