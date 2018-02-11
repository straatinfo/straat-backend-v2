const SendGridService = require('../service/sendgrid.service');
const Config = require('../config');
const MailTemplates = require('../assets/mail-templates/simple-mails');

// access code for android
const sendRegistrationRequestNotif = (userDetail) => {
  const { fname, lname, email, message } = userDetail;
  const receiver = Config.EMAIL_ADDRESSES.STRAAT_INFO_EMAIL;
  const subject = 'Request for access';
  const mailBody = MailTemplates.sendRegistrationRequestNotifMail(email, fname, lname, message);
  return new Promise(async(resolve, reject) => {
    try {
      const sendBasicMail = await SendGridService.basicMail('newteamrequest@straat.info', receiver, subject, mailBody);
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
const sendSuccessfulRegistrationNotif = (teamDetails) => {
  const { teamName, teamEmail } = teamDetails;
  const receiver = Config.EMAIL_ADDRESSES.SEQRETARY_EMAIL;
  const sender = Config.EMAIL_ADDRESSES.NEW_TEAM_REQUEST;
  const subject = 'New Team Request Non Volunteer';
  const mailBody = MailTemplates.sendTeamRequestNotifMail(teamEmail, teamName);
  return new Promise(async(resolve, reject) => {
    try {
      const sendBasicMail = await SendGridService.basicMail(sender. receiver, subject, mailBody);
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
const sendReportANotifForHost = () => {
  return new Promise((resolve, reject) => {

  });
};

const sendReportANotifForTeamLeader = () => {
  return new Promise((resolve, reject) => {

  });
};

// report B notification
const sendReportBNotif = () => {
  return new Promise((resolve, reject) => {

  });
};

// report C notification
const sendReportCNotif = () => {
  return new Promise((resolve, reject) => {

  });
};

// feedback notif
const sendFeedBackNotif = () => {
  return new Promise((resolve, reject) => {

  });
};

// delete team notif
const deleteTeamNotif = () => {
  return new Promise((resolve, reject) => {

  });
};

module.exports = {
  sendRegistrationRequestNotif: sendRegistrationRequestNotif,
  sendSuccessfulRegistrationNotif: sendSuccessfulRegistrationNotif,
  sendReportANotifForHost: sendReportANotifForHost,
  sendReportANotifForTeamLeader: sendReportANotifForTeamLeader,
  sendReportBNotif: sendReportBNotif,
  sendReportCNotif: sendReportCNotif,
  sendFeedBackNotif: sendFeedBackNotif,
  deleteTeamNotif: deleteTeamNotif
};
