const sgMail = require('@sendgrid/mail');
const Config = require('../config');
// for costumized mails
const sg = require('sendgrid')(Config.SENDGRID.SENDGRID_API_KEY);
const sgMailHelper = require('sendgrid').mail;

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

const basicMailWithCC = (sender = 'Straat.info No reply', receiver, subject, message, bcc) => {
  return new Promise(async(resolve, reject) => {
    const msg = {
      to: receiver,
      from: sender,
      subject: subject,
      html: message,
      bcc: bcc && Array.isArray(bcc) ? bcc : []
    };
    try {
      sgMail.setApiKey(Config.SENDGRID.SENDGRID_API_KEY);
      const mailResponse = await sgMail.send(msg).then(res => console.log(JSON.stringify(res)));
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

const mailWithCC = (sender, receiver, subject, message, cc = [], senderName = null) => {
  return new Promise(async(resolve, reject) => {
    const sgSender = new sgMailHelper.Email(sender, senderName||'');
    const sgReceiver = new sgMailHelper.Email(receiver);
    const sgContent = new sgMailHelper.Content('text/html', message);
    const sgSubject = subject;
    let mailObj = new sgMailHelper.Mail(sgSender, sgSubject, sgReceiver, sgContent);
    try {
      for (let i = 0; i > cc.length; i++) {
        mailObj.personalizations[0].addCc(new sgMailHelper.Email(cc[i]));
      }
      console.log(mailObj);
      const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mailObj.toJSON()
      });
      sg.API(request, (err, response) => {
        if(err) {         
          resolve({err: err});
        } else {
          console.log(response);
          resolve({err: null, message: 'Success'});
        }
      });
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  basicMail: basicMail,
  mailWithCC: mailWithCC,
  basicMailWithCC
};
