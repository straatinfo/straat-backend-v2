const SendGridService = require('../service/sendgrid.service');
const Config = require('../config');
const MailTemplates = require('../assets/mail-templates/simple-mails');
const ReportMailTemplates = require('../assets/mail-templates/formats/reports');
const L = require('./../assets/dictionary')

// access code for android
const sendRegistrationRequestNotif = (userDetail) => {
  const { email, fname, lname, message, phoneNumber } = userDetail;
  const receiver = Config.EMAIL_ADDRESSES.STRAAT_INFO_EMAIL;
  const sender = Config.EMAIL_ADDRESSES.UPDATE_REQUEST_EMAIL;
  const subject = 'Request for Update';
  const mailBody = MailTemplates.sendRegistrationRequestNotifMail(email, fname, lname, message, phoneNumber);
  return new Promise(async(resolve, reject) => {
    try {
      const sendBasicMail = await SendGridService.basicMail(sender, receiver, subject, mailBody);
      if (sendBasicMail.err) {
        return resolve({err: sendBasicMail.err});
      }
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

// registration notification team request for approval
const sendNewTeamRequestNotif = (teamDetails, userData) => {
  const { teamName, teamEmail } = teamDetails;
  const receiver = Config.EMAIL_ADDRESSES.SEQRETARY_EMAIL;
  const sender = Config.EMAIL_ADDRESSES.NEW_TEAM_REQUEST;
  const subject = 'New Team Request Non Volunteer';
  const mailBody = MailTemplates.sendTeamRequestNotifMail(teamEmail, teamName, sender, userData);
  return new Promise(async(resolve, reject) => {
    try {
      const sendBasicMail = await SendGridService.basicMail(sender, receiver, subject, mailBody);
      if (sendBasicMail.err) {
        return resolve({err: sendBasicMail.err});
      }
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

// report A nofication
const sendReportANotifToHost = (username, hostName, hostEmail, teamName, teamEmail, text, category1, category2 = null, location, reportDeepLink, language) => {
  const cc = [Config.EMAIL_ADDRESSES.HOST_EMAIL_CC];
  const sender = Config.EMAIL_ADDRESSES.NO_REPLY;
  const receiver = hostEmail;
  const subject = L(language, 'newNotificationOfPublicSpace')
  const mailBody = MailTemplates.sendReportAToHost(username, teamName, teamEmail, text, category1, category2, location, reportDeepLink, language);
  // console.log('SendGridService.basicMail(sender, receiver, subject, mailBody);', sender, receiver, subject, mailBody) 
  return new Promise(async(resolve, reject) => {
    try {
      const sendBasicMail = await SendGridService.basicMailWithCC(sender, receiver, subject, mailBody, cc);
      if (sendBasicMail.err) {
        return resolve({err: sendBasicMail.err});
      }
      resolve({err: null});
    } 
    catch (e) {
      reject(e);
    }
  });
};

// report A notification to reporter
const sendReportANotifToReporter = (reporterUsername, reporterLastname, reporterEmail, teamLeaderEmail = [], location, date, category1, category2 = null, text, language) => {
  let CC
  const sender = Config.EMAIL_ADDRESSES.NO_REPLY
  // const receiver = reporterEmail
  const subject = L(language, 'yourNewNotificationPublicSpace')
  const mailBody = ReportMailTemplates.sendReportANotifToReporter(reporterUsername, reporterLastname, location, date, category1, category2, text, language)
  if (teamLeaderEmail.length > 0) {
    CC = [Config.EMAIL_ADDRESSES.SEQRETARY_EMAIL, ...teamLeaderEmail] // reporterEmail];
  } else {
    CC = [Config.EMAIL_ADDRESSES.SEQRETARY_EMAIL]
  }

  return new Promise(async(resolve, reject) => {
    try {
      const sendEmailWithCC = await SendGridService.mailWithCC(sender, reporterEmail, subject, mailBody, CC, sender)
      if (sendEmailWithCC.err) {
        console.log(sendEmailWithCC.err);
        return resolve({err: sendEmailWithCC.err});
      }
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

const sendReportANotifForTeamLeader = () => {
  return new Promise((resolve, reject) => {

  });
};

// report B notification
const sendReportBNotifToReporter = (reporterEmail, date, mainCategoryName, location, text, language = 'nl') => {
  const sender = Config.EMAIL_ADDRESSES.NO_REPLY;
  const receiver = reporterEmail;
  const subject = 'Report B';
  const mailBody = ReportMailTemplates.sendReportBNotifToReporter(location, date, mainCategoryName, text, language);
  const CC = [Config.EMAIL_ADDRESSES.SEQRETARY_EMAIL];
  return new Promise(async(resolve, reject) => {
    try {
      const sendMailWithCC = await SendGridService.mailWithCC(sender, receiver, subject, mailBody, CC);
      if (sendMailWithCC.err) {
        return resolve({err: sendMailWithCC.err});
      }
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

// report C notification
const sendReportCNotifToReporter = (reporterEmail, date, mainCategoryName, location, text, language = 'nl') => {
  const sender = Config.EMAIL_ADDRESSES.NO_REPLY;
  const receiver = reporterEmail;
  const subject = 'Report C';
  const mailBody = ReportMailTemplates.sendReportBNotifToReporter(location, date, mainCategoryName, text, language);
  const CC = [Config.EMAIL_ADDRESSES.SEQRETARY_EMAIL];
  return new Promise(async(resolve, reject) => {
    try {
      const sendMailWithCC = await SendGridService.mailWithCC(sender, receiver, subject, mailBody, CC);
      if (sendMailWithCC.err) {
        return resolve({err: sendMailWithCC.err});
      }
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

// feedback notif
const sendFeedBackNotif = (reporterName, reporterEmail, feedback, info) => {
  const sender = Config.EMAIL_ADDRESSES.FEED_BACK_EMAIL;
  const receiver = Config.EMAIL_ADDRESSES.SEQRETARY_EMAIL;
  const subject = 'FEEDBACK';
  const mailBody = MailTemplates.sendFeedBackNotif(feedback, reporterName, reporterEmail, info);
  return new Promise(async(resolve, reject) => {
    try {
      const sendBasicMail = await SendGridService.basicMail(sender, receiver, subject, mailBody);
      if (sendBasicMail.err) {
        return resolve({err: sendBasicMail.err});
      }
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

// delete team notif
const deleteTeamNotif = () => {
  return new Promise((resolve, reject) => {

  });
};

// forgot password notif
const forgotPasswordNotif = (email, newPassword) => {
  const receiver = email;
  const sender = Config.EMAIL_ADDRESSES.STRAAT_INFO_EMAIL;
  const subject = 'Nieuw tijdelijk wachtwoord';
  const mailBody = MailTemplates.fogotPasswordNotif(newPassword);
  return new Promise(async(resolve, reject) => {
    try {
      const sendBasicMail = await SendGridService.basicMail(sender, receiver, subject, mailBody);
      if (sendBasicMail.err) {
        return resolve({err: sendBasicMail.err});
      }
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

// Activate host notif
const activateHostNotif = (email, password) => {
  const receiver = email;
  const sender = Config.EMAIL_ADDRESSES.STRAAT_INFO_EMAIL;
  const subject = 'Nieuw tijdelijk wachtwoord';
  const mailBody = MailTemplates.activateHostNotif(password);
  return new Promise(async(resolve, reject) => {
    try {
      const sendBasicMail = await SendGridService.basicMail(sender, receiver, subject, mailBody);
      if (sendBasicMail.err) {
        return resolve({err: sendBasicMail.err});
      }
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
};

const databaseBackup = (email, dbURL, time) => {
  const receiver = email;
  const sender = Config.EMAIL_ADDRESSES.STRAAT_INFO_EMAIL;
  const subject = 'DATABASE BACKUP -' + time ;
  const mailBody = MailTemplates.databaseBackupNotif(dbURL, time);
  return new Promise(async(resolve, reject) => {
    try {
      const sendBasicMail = await SendGridService.basicMail(sender, receiver, subject, mailBody);
      console.log(sendBasicMail);
      if (sendBasicMail.err) {
        return reject({
          status: 'ERROR',
          statusCode: 400,
          message: sendBasicMail.err
        });
      }
      return resolve({
        status: 'SUCCESS',
        statusCode: 200,
        message: 'Successfully sent EMAIL'
      });
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  sendRegistrationRequestNotif: sendRegistrationRequestNotif,
  sendNewTeamRequestNotif: sendNewTeamRequestNotif,
  sendReportANotifToHost: sendReportANotifToHost,
  sendReportANotifToReporter: sendReportANotifToReporter,
  // sendReportANotifForTeamLeader: sendReportANotifForTeamLeader,
  sendReportBNotifToReporter: sendReportBNotifToReporter,
  sendReportCNotifToReporter: sendReportCNotifToReporter,
  sendFeedBackNotif: sendFeedBackNotif,
  // deleteTeamNotif: deleteTeamNotif,
  forgotPasswordNotif: forgotPasswordNotif,
  activateHostNotif,
  databaseBackup
};
