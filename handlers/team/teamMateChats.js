const Promise = require('bluebird');
const _ = require('lodash');

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

function getTeamConvoPreview (req, res, next) {
  const convoId = req.$scope.team && req.$scope.team._conversation;
  return req.db.Message.find({_conversation: convoId})
    .populate('_author')
    .sort({ createdAt: -1 })
    .limit(1)
    .then((convos) => {
      if (convos[0]) {
        const convo = convos[0];
        const teamMessagePreview = {
          body: convo.body,
          createdAt: convo.createdAt,
          author: convo._author && convo._author.username,
          authorId: convo._author && convo._author._id
        };

        console.log(teamMessagePreview);

        req.$scope.teamMessagePreview = teamMessagePreview;
      }

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

          const chatMate = _.find(convo.participants, (p) => {
            return p._user && p._user._id.toString() != userId;
          });

          return {...convo.toObject(), messagePreview, chatMate: chatMate && chatMate._user};
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
  const teamMessagePreview = req.$scope.teamMessagePreview;

  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    conversations,
    teamMessagePreview
  });
}

module.exports = {
  getTeam,
  getTeamConvoPreview,
  populateConversation,
  populateUnreadChat,
  getLatestChat,
  respond
};
