module.exports = {
  sendRegistrationRequestNotifMail: (email, fname, lname, message) => {
    return `<p>Greetings!</p><br/><p>A new user is requesting for an access code.<p/><p>User Details:<p/><p>Email: ${email}<p/><p>Firstname: ${fname}<p/><p>Lastname: ${lname} </p><br /><p>Sincerely,<p>Straat.info-team</p>`;
  },
  sendTeamRequestNotifMail: (teamEmail, teamName) => {
    return `<p>Greetings!</p><br/><p>A new Non-Volunteer Team is requesting for approval.<p/><p>User Details:<p/><p>Email: ${teamEmail}<p/><p>Team Name: ${teamName}<p/><p>Sincerely,<p>newteamrequest@straat.info</p>`;
  },
  sendReportAForHost: (username, teamName, text, category1, category2) => {
    return `
    <p>NB deze mail niet replyen aub. De mailgegevens van de melder treft u hieronder aan</p>
    <p>Geachte mevrouw, mijnheer,</p>
    <p>${username} van ${teamName} heeft zojuist een melding openbare ruimte gedaan. Zou u deze melding in behandeling willen nemen?</p>
    <p>	Meldingscategorie 1: ${category1}</p>
    <p>Meldingscategorie 2: ${(category2) ? category2 : '-'}</p>
    `
  }
}
/*
"NB deze mail niet replyen aub. De mailgegevens van de melder treft u hieronder aan.
 
Geachte mevrouw, mijnheer,
[chatname of reporter]  van  [name team] heeft zojuist een melding openbare ruimte gedaan. Zou u deze melding in behandeling willen nemen?
 	Meldingscategorie 1: [category 1]
	Meldingscategorie 2: [category 2] [if there is no category 2, then field show “-“ sign]
	Eventuele toelichting: [free text field] [if there is no text entered by reporter, then field show “-“ sign]
	Locatie: [location: street, postal code, city, Country]
Zou u een ontvangstbevestiging, het evt inboeknummer en de stand van zaken willen doorgeven aan [emailaddress team]
 
Voor een kaart en eventuele foto’s klik hier [the words “klik hier” are hyperlinked with the unique page of the report]
Via deze link kunt u - indien u dat wenst - ook de status van de melding aan het team doorgeven. De wijziging van de status wordt voor iedereen zichtbaar op de kaart van de app straat.info, zodat niet alleen de melder maar ook alle andere gebruikers kunnen zien wat de status is.
Veel dank alvast voor uw reactie!
Met vriendelijke groet
[team name]
  
PS Deze melding is verzonden met de app straat.info dé app voor buurtpreventie. Als u vragen heeft, of tips ter verbetering over de app, kunt u terecht via het formulier op www.straat.info of via info@straat.info
"
*/