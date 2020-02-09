const sendgridService = require('../utils/sendgrid');
const config = require('../config');
const mailTemplates = require('../fixtures/mail-templates/simple-mails');
const ReportMailTemplates = require('../fixtures/mail-templates/formats/reports');
const L = require('./../fixtures/dictionary')

// access code for android

async function sendNewTeamRequestNotif (teamDetails, userData) {
  try {
    const { teamName, teamEmail } = teamDetails;
    const receiver = config.email_address.SEQRETARY_EMAIL;
    const sender = config.email_address.NEW_TEAM_REQUEST;
    const subject = 'New Team Request Non Volunteer';
    const mailBody = mailTemplates.sendTeamRequestNotifMail(teamEmail, teamName, sender, userData);
    
    const sendBasicMail = await sendgridService.basicMail(sender, receiver, subject, mailBody);

    return sendBasicMail;
  } catch (e) {
    throw e;
  }
};


module.exports = {
  sendNewTeamRequestNotif: sendNewTeamRequestNotif
};
