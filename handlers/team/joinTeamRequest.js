
function getTeamData (req, res, next) {
  const teamId = req.body._team || req.body.teamId;
  if (teamId) {
    return req.db.Team.findOne({ _id: teamId })
      .populate({
        path: 'teamLeaders',
        populate: {
          path: '_user'
        }
      })
      .then((team) => {
        if (!team) {
          return res.end();
        }
        const tokens = team.teamLeaders.reduce((pv, cv) => {
          if (cv && cv._user && cv._user.firebaseTokens) {
            cv._user.firebaseTokens.map(ft => {
              pv.push(ft.token);
            });
          }
          return pv;
        }, []);

        req.$scope.fcmTokens = tokens;
        return next();
      })
      .catch(e => {
        console.log('\n\nERROR: ', e, '\n\n');
        res.end();
      });
  }
  res.end();
}

async function sendNotification (req, res, next) {
  try {
    const fcmTokens = req.$scope.fcmTokens || [];
    console.log('\n\n\nTOKENS: ', fcmTokens, '\n\n\n')
    const teamId = req.body._team || req.body.teamId;
    const teamRequests = await req.db.TeamInvite.find({ _team: teamId });
    const message = {
      data: {
        teamId: teamId || '',
        teamRequestsCount: String(teamRequests.length) || '0',
        customPayloadId: 'NEW_USER_REQUEST_NOTIFICATION_GROUP'
      },
      notification: {
        title: `New request to join team`,
        body: teamRequests && teamRequests.length > 0 ? `There are ${teamRequests.length} new requests` :``,
      },
      android: {
        ttl: 3600 * 1000,
        notification: {
          icon: process.env.DEFAULT_ANDROID_NOTIF_ICON,
          click_action: '.MyTeamActivity',
          title: `New request to join team`,
          body: teamRequests && teamRequests.length > 0 ? `There are ${teamRequests.length} new requests` :``,
          color: process.env.DEFAULT_ANDROID_NOTIF_COLOR,
          sound : process.env.DEFAULT_ANDROID_NOTIF_SOUND,
          tag: 'NEW_USER_REQUEST_NOTIFICATION_GROUP'
        }
      },
      apns: {
        payload: {
          aps: {
            'content-available': 1,
            alert: teamRequests && teamRequests.length > 0 ? `New request to join team\nThere are ${teamRequests.length} new requests` :`New request to join team`,
            badge: teamRequests && teamRequests.length || 0,
            sound: 'default'
          }
        }
      }
    };

    const sendMessages = await req.lib.fcm.sendToMultipleTokenAsync(message, fcmTokens);
    console.log(sendMessages);
    res.end();
  } catch (e) {
    console.log('\n\nERROR: ', e, '\n\n');
    res.end();
  }
}

module.exports = {
  getTeamData,
  sendNotification
};
