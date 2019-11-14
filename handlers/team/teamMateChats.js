const Promise = require('bluebird');
const conversationHelper = require('../../helpers/conversationV2.helper');
const internals = {};

internals.catchError = (err, req, res) => {
  const error = {
    status: 'ERROR',
    statusCode: 1,
    httpCode: 500,
    message: 'Internal Server Error'
  };
  console.log('teamMateChats ERROR', err);
  res.status(error.httpCode).send(error);
};

function getTeam (req, res, next) { // populate team mates
  const teamId = req.params.teamId;
  return req.db.Team.findById(teamId)
    .populate({
      path: 'teamMembers',
      populate: {
        path: '_user',
        select: '_id email username fname lname gender _profilePic',
        populate: {
          path: '_profilePic'
        }
      }
    })
    .then((team) => {
      if (!team) {
        return res.status({
          status: 'ERROR',
          statusCode: 3,
          httpCode: 400,
          message: 'Invalid Parameter: Team ID'
        });
      }

      req.$scope.team = team;
      req.$scope.teamMembers = team && team.teamMembers;
      next();
    })
    .catch(e => internals.catchError(e, req, res));
}

function populateConversation (req, res, next) { // populate conversation, if no conversation, create, need userId
  const userId = req.params.userId;
  const teamMembers = req.$scope.teamMembers;
  return Promise.mapSeries(teamMembers,
    teamMember => 
      conversationHelper.createConversation('private', userId, teamMember._user._id)
    )
      .then((conversations) => {
        convos = conversations.map((convo) => {
          const messagePreview = convo && convo.messages && convo.messages[0] ?
            {
              body: convo.messages[0].body,
              createdAt: convo.messages[0].createdAt,
              author: convo.messages[0]._author && convo.messages[0]._author.username,
              authorId: convo.messages[0]._author && convo.messages[0]._author._id
            } : null;

          return {...convo.toObject(), messagePreview};
        });
        req.$scope.conversations = convos;
        next();
      })
      .catch(e => internals.catchError(e, req, res));
    
}

function populateUnreadChat (req, res, next) { // get unread chat count
  // @TODO
  next();
}

function getLatestChat (req, res, next) { // get latest chats
  // @TODO
  next();
}

function respond (req, res) {
  const conversations = req.$scope.conversations;

  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    conversations
  });
}

module.exports = {
  getTeam,
  populateConversation,
  populateUnreadChat,
  getLatestChat,
  respond
};
