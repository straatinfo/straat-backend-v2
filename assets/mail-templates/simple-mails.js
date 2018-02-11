module.exports = {
  sendRegistrationRequestNotifMail: (email, fname, lname, message) => {
    return `<p>Greetings!</p><br/><p>A new user is requesting for an access code.<p/><p>User Details:<p/><p>Email: ${email}<p/><p>Firstname: ${fname}<p/><p>Lastname: ${lname} </p><br /><p>Sincerely,<p>Straat.info-team</p>`;
  }
}