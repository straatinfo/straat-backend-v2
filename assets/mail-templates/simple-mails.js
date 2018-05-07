module.exports = {
  sendRegistrationRequestNotifMail: (email, fname, lname, message, phoneNumber) => {
    return `
      <p>Greetings!</p>
      <br/>
      <p>A new user is requesting for an access code.<p/>
      <p>User Details:<p/>
      <p>Email: ${email}<p/>
      <p>Firstname: ${fname}<p/>
      <p>Lastname: ${lname} </p>
      <p>Phone Number: ${(phoneNumber) ? phoneNumber : '-'}</p>
      <p>message: ${(message) ? message : 'No Message'}</p>
      <br />
      <p>Sincerely,</p>
      <p>Straat.info-team</p>
    `;
  },
  sendTeamRequestNotifMail: (teamEmail, teamName, sender) => {
    return `<p>Greetings!</p><br/><p>A new Non-Volunteer Team is requesting for approval.<p/><p>User Details:<p/><p>Email: ${teamEmail}<p/><p>Team Name: ${teamName}<p/><p>Sincerely,<p>${sender}</p>`;
  },
  sendReportAToHost: (username, teamName,teamEmail, text, category1, category2, location, reportDeepLink) => {
    return `
    <p>NB deze mail niet replyen aub. De mailgegevens van de melder treft u hieronder aan</p>
    <p>Geachte mevrouw, mijnheer,</p>
    <p>${username} van ${teamName} heeft zojuist een melding openbare ruimte gedaan. Zou u deze melding in behandeling willen nemen?</p>
    <p>Meldingscategorie 1: ${category1}</p>
    <p>Meldingscategorie 2: ${(category2) ? category2 : '-'}</p>
    <p>Eventuele toelichting: ${(text) ? text : '-'}</p>
    <p>Locatie: ${location}</p>
    <p>Zou u een ontvangstbevestiging, het evt inboeknummer en de stand van zaken willen doorgeven aan ${teamEmail}</p>
    <p>Voor een kaart en eventuele foto’s <a href="${reportDeepLink}">klik hier</a></p>
    <p>Via deze link kunt u - indien u dat wenst - ook de status van de melding aan het team doorgeven. De wijziging van de status wordt voor iedereen zichtbaar op de kaart van de app straat.info, zodat niet alleen de melder maar ook alle andere gebruikers kunnen zien wat de status is.</p>
    <p>Veel dank alvast voor uw reactie!</p>
    <p>Met vriendelijke groet</p>
    <p>${teamName}</p>
    </br>
    <p>PS Deze melding is verzonden met de app straat.info dé app voor buurtpreventie. Als u vragen heeft, of tips ter verbetering over de app, kunt u terecht via het formulier op www.straat.info of via info@straat.info</p>
    `;
  },
  sendReportANotifToReporter: (location, date, category1, category2 = null, text = null) => {
    return `
      <p>Dear madam, sir,</p>
      <p> You just made a report ${date} </p>
      <p>Meldingscategorie 1: ${category1}</p>
      <p>Meldingscategorie 2: ${(category2) ? category2 : '-'}</p>
      <p>Eventuele toelichting: ${(text) ? text : '-'}</p>
      <p>Locatie: ${location}</p>
      </br>
      <p>This report has been sent to the relevant host.</p>
      <p>Thank you for using straat.info</p>
      </br>
      <p>If you have any questions or ideas, could you please use the feedback form in the app?</p>
    `;
  },
  sendReportANotifToTeam: (gender, createdAt, categoryName) => {
    let greeting;
    if (gender && gender.toUpperCase() === 'MALE') {
      greeting = 'Sir,';
    } else if (gender && gender.toUpperCase() === 'FEMALE') {
      greeting = 'Madam,';
    } else {
      greeting = 'Sir, Madam,';
    }
    return `
    <p>Dear ${greeting}</p>
    <p>You just made a report ${createdAt}</p>
    <p>report ${categoryName}</p>
    <p>This report has been send to the relevant host.</p>
    <p>Thank you for using straat.info</p>
    </br>
    <p>If you have any questions or ideas, could you please use the feedback form in the app?</p>
    `;
  },
  sendReportBNotifToReporter: (date, mainCategoryName, location, text = null) => {
    return `
      <p>Dear madam, sir,</p>
      <p> You just made a report ${date} </p>
      <p>Meldingscategorie 1: ${mainCategoryName}</p>
      <p>Eventuele toelichting: ${(text) ? text : '-'}</p>
      <p>Locatie: ${location}</p>
      </br>
      <p>This report has been sent to the relevant host.</p>
      <p>Thank you for using straat.info</p>
      </br>
      <p>If you have any questions or ideas, could you please use the feedback form in the app?</p>
    `;
  },
  sendReportBNotifToHost: () => {

  },
  sendFeedBackNotif: (feedBackMessage, reporterName, reporterEmail) => {
    return `
      <p>Greetings!</p>
      <p>You receive a new feed back from ${reporterName}</p>
      <p>Email: ${reporterEmail}</p>
      <p>Feedback:</p>
      <p>${feedBackMessage}</p>
      </br>
      <p>Thank you.</p>
    `;
  },
  fogotPasswordNotif: (newPassword) => {
    return `
    <p>Geachte mevrouw, mijnheer,</p>
    <p>Voor uw account hebben we een aanvraag gehad voor een nieuw wachtwoord. Als u dat niet heeft aangevraagd, hoeft u niets te doen.</p>
    <p>Als u het heeft aangevraagd, kunt u de volgende tijdelijke code als wachtwoord gebruiken: ${newPassword} </p>
    </br>
    <p>Vriendelijke groet</p>
    <p>Straat.info</p>
    `;
  },
  activateHostNotif: (password) => {
    return `
    <p>Geachte mevrouw, mijnheer,</p>
    <p>U of namens uw organisatie is  een tijdelijk wachtwoord voor uw account bij straat.info aangevraagd. Het wachtwoord is ${password}. </p>
    </br>
    <p>Vriendelijke groet</p>
    <p>Straat.info</p>
    `;
  }
}
