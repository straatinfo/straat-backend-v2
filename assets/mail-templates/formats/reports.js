const { Langauges } = require('./../../jsonfiles/constants')

const __toHtml = (arrayOfDeviceInfo) => {
  if (!arrayOfDeviceInfo.map) {
    return ''
  }
  const html = arrayOfDeviceInfo.map((info) => {
    return `${info.title}: ${info.info}<br />`
  })
  return html.join('')
}

/**
 * @description sendReportAToHost email
 * @param {*} username
 * @param {*} teamName
 * @param {*} teamEmail
 * @param {*} text
 * @param {*} category1
 * @param {*} category2
 * @param {*} location
 * @param {*} reportDeepLink
 * @param {*} language
 * @returns string email format
 *
 */

const sendReportAToHost = (username, teamName, teamEmail, text, category1, category2, location, reportDeepLink, language) => {
  // English
  if (language === Langauges.en) {
    return `
        <p>Please do not reply to this e-mail. The mail details of the detector can be found below </ p>
        <p>Dear Madam, sir, </ p>
        <p>${username} of ${teamName} has just made a public space report. Would you like to process this report? </ P>
        <p>Notification category 1: ${category1} </ p>
        <p>Notification category 2: ${(category2) || '-'} </ p>
        <p>Possible explanation: ${(text) || '-'} </ p>
        <p>Location: ${location} </ p>
        <p>Would you like to send an acknowledgment of receipt, the eventual registration number and the state of affairs to ${teamEmail} </ p>
        <p>For a map and any photos <a href="${reportDeepLink}"> click here </a> </ p>
        <p>Via this link you can - if you wish - also report the status of the report to the team. The change of status will be visible to everyone on the map of the app straat.info, so that not only the reporter but also all other users can see what the status is. </ P>
        <p>Many thanks for your response! </ p>
        <p>Sincerely </ p>
        <p>${teamName} </ p>
        </br>
        <p>PS This message was sent with the app straat.info the app for neighborhood prevention. If you have any questions or suggestions for improvement about the app, you can go to the form on www.straat.info or via info@straat.info </ p>
        `
  }
  // dutch
  return `
    <p>NB deze mail niet replyen aub. De mailgegevens van de melder treft u hieronder aan</p>
    <p>Geachte mevrouw, mijnheer,</p>
    <p>${username} van ${teamName} heeft zojuist een melding openbare ruimte gedaan. Zou u deze melding in behandeling willen nemen?</p>
    <p>Meldingscategorie 1: ${category1}</p>
    <p>Meldingscategorie 2: ${(category2) || '-'}</p>
    <p>Eventuele toelichting: ${(text) || '-'}</p>
    <p>Locatie: ${location}</p>
    <p>Zou u een ontvangstbevestiging, het evt inboeknummer en de stand van zaken willen doorgeven aan ${teamEmail}</p>
    <p>Voor een kaart en eventuele foto’s <a href="${reportDeepLink}">klik hier</a></p>
    <p>Via deze link kunt u - indien u dat wenst - ook de status van de melding aan het team doorgeven. De wijziging van de status wordt voor iedereen zichtbaar op de kaart van de app straat.info, zodat niet alleen de melder maar ook alle andere gebruikers kunnen zien wat de status is.</p>
    <p>Veel dank alvast voor uw reactie!</p>
    <p>Met vriendelijke groet</p>
    <p>${teamName}</p>
    </br>
    <p>PS Deze melding is verzonden met de app straat.info dé app voor buurtpreventie. Als u vragen heeft, of tips ter verbetering over de app, kunt u terecht via het formulier op www.straat.info of via info@straat.info</p>
    `
}

const sendReportANotifToReporter = (username, lastname, location, date, category1, category2 = null, text = null, language) => {
  // English
  if (language === Langauges.en) {
    return `
      <p>Dear madam, sir, </p>
      <p>You just made a report ${date} </p>
      <p>Notification category 1: ${category1} </p>
      <p>Notification category 2: ${(category2) || '-'} </p>
      <p>Any explanation: ${text || '-'} </p>
      <p>Location: ${location} </p>
      </br>
      <p>This report has been sent to the relevant host. </p>
      <p>Thank you for using straat.info </p>
      </br>
      <p>If you have any questions or ideas, could you please use the feedback form in the app? </p>
    `
  }

  return `
  <p>Geachte mevrouw / mijnheer </p>
  <p>U heeft met de app straat.info op ${date} een nieuwe melding gedaan met de volgende gegevens: </p>
  <p>Locatie: ${location} </p>
  <p>Melding: ${category1} ${category2 || '-'} </p>
  <p>Uw eventuele toelichting: ${text || '-'} </p>
  
  </br>
  <p>De melding is naar de gemeente gestuurd met het verzoek om de melding af te handelen.</p>
  <p>Dank voor het gebruiken van straat.info!</p>
  </br>
  <p>Vriendelijke groet</p>
  <p>Het straat.info team</p>
  </br>
  <p>PS als u vragen of ideeën voor verbetering heeft, zou u die dan aan ons willen doorgeven via het feedback formulier in het menu van de app?</p>
`
}

module.exports = {
  sendReportAToHost,
  sendReportANotifToReporter
}
