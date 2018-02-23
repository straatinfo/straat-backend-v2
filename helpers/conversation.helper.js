const Participant = require('../models/Participant');
const Conversation = require('../models/Conversation');
const ParticipantHelper = require('../helpers/participant.helper');
const TeamHelper = require('./team.helper');
const MessageHelper = require('./Message.helper');

const getConversations = () => {
  return new Promise((resolve, reject) => {
    Conversation.find({})
    .populate({
      path: 'participants'
    })
    .populate({
      path: 'messages'
    })
    .populate({
      path: '_team'
    })
    .exec((err, conversations) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, conversations: conversations});
    });
  });
};

const getUserConversations = (_user) => {
  return new Promise((resolve, reject) => {
    Participant.find({'_user': _user})
    .populate({
      path: 'participants'
    })
    .populate({
      path: 'messages'
    })
    .populate({
      path: '_team'
    })
    .exec((err, participants) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, participants: participants});
    });
  });
};

const getConversationById = (_id) => {
  return new Promise((resolve, reject) => {
    Conversation.findById(_id)
    .populate({
      path: 'participants'
    })
    .populate({
      path: 'messages'
    })
    .populate({
      path: '_team'
    })
    .exec((err, conversation) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, conversation: conversation});
    });
  });
};

const createConversation = (_user, input) => {
  return new Promise((resolve, reject) => {
    const newConversation = new Conversation({...input, '_author': _user});
    newConversation.save( async(err, conversation) => {
      if (err) {
        return resolve({err: err});
      }
      try {
        const addParticipant = await ParticipantHelper.newParticipant(_user, conversation._id);
        if (addParticipant.err) {
          return resolve({err: addParticipant.err});
        }
        const addParticipantToConvo = await ParticipantHelper.addParticipantToConversation(addParticipant.participant._id, conversation._id);
        if (addParticipantToConvo.err) {
          return resolve({err: addParticipantToConvo.err});
        }
        if (input._team) {
          const addConvoToTeam = await TeamHelper.addConvoToTeam(input._team, conversation._id);
          if (addConvoToTeam.err) {
            return resolve({err: addConvoToTeam.err});
          }
          return resolve({err: null, conversation: conversation});
        }
        resolve({err: null, conversation: conversation});
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

const updateConversation = (_id, input) => {
  return new Promise((resolve, reject) => {
    Conversation.findByIdAndUpdate(_id, input, (err, conversation) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, conversation: conversation});
    });
  });
};

const deleteConversation = (_id) => {
  return new Promise((resolve, reject) => {
    Conversation.findByIdAndRemove(_id, async(err, conversation) => {
      if (err) {
        return resolve({err: err});
      }
      if (!conversation) {
        return resolve({err: null, conversation: null});
      }
      const deleteParticipants = await ParticipantHelper.deleteAllParticipants(_id);
      if (deleteParticipants.err) {
        return resolve({err: deleteParticipants.err});
      }
      const deleteMessages = await MessageHelper.deleteAllMessagesInConvo(_id);
      if (deleteMessages.err) {
        return resolve({err: deleteMessages.err});
      }
      if (conversation._team) {
        const removeConvoToTeam = await TeamHelper.removeConvoToTeam(conversation._team, conversation._id);
        if (removeConvoToTeam.err) {
          return resolve({err: removeConvoToTeam.err});
        }
        return resolve({err: null, conversation: conversation});
      }
      resolve({err: null, conversation: conversation});
    });
  });
};

const addParticipant = (_user, _conversation) => {
  return new Promise(async(resolve, reject) => {
    try {
      const newParticipant = await ParticipantHelper.newParticipant(_user, _conversation);
      if (newParticipant.err) {
        return resolve({err: newParticipant.err});
      }
      const addParticipantToConvo = await ParticipantHelper.addParticipantToConversation(newParticipant.participant._id, _conversation);
      if (addParticipantToConvo.err) {
        return resolve({err: addParticipantToConvo.err});
      }
      resolve({err: null, participant: newParticipant.participant });
    }
    catch (e) {
      reject(e);
    }
  });
};

const removeParticipant = (_user, _conversation) => {
  return new Promise(async(resolve, reject) => {
    try {
      const deleteParticipant = await ParticipantHelper.deleteParticipant(_user, _conversation);
      if (deleteParticipant.err) {
        return resolve({err: deleteParticipant.err});
      }
      const deleteParticipantToConvo = await ParticipantHelper.deleteParticpantToConversation(_user, _conversation);
      if (deleteParticipantToConvo.err) {
        return resolve({err: deleteParticipantToConvo.err});
      }
      resolve({err: null, participant: deleteParticipant.participant});
    }
    catch (e) {
      reject(e);
    }
  });
};

const addMessageToConversation = (_conversation, _message) => {
  return new Promise((resolve, reject) => {
    Conversation.findByIdAndUpdate(_conversation,
    { '$addToSet': { 'messages': _message } },
    { 'new': true, 'upsert': true },
    (err, conversation) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, conversation: conversation});
    });
  });
};

const removeMessageToConversation = (_conversation, _message) => {
  return new Promise((resolve, reject) => {
    Conversation.findByIdAndUpdate(_conversation,
    { '$pop': { 'messages': _message } },
    (err, conversation) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, conversation: conversation});
    });
  });
};

module.exports = {
  getConversations: getConversations,
  getConversationById: getConversationById,
  getUserConversations: getUserConversations,
  createConversation: createConversation,
  updateConversation: updateConversation,
  deleteConversation: deleteConversation,
  addParticipant: addParticipant,
  removeParticipant: removeParticipant,
  addMessageToConversation: addMessageToConversation,
  removeMessageToConversation: removeMessageToConversation
};
