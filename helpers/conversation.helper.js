const Participant = require('../models/Participant');
const Conversation = require('../models/Conversation');
const ParticipantHelper = require('../helpers/participant.helper');

const getConversations = () => {
  return new Promise((resolve, reject) => {
    Conversation.find()
    .populate({
      path: 'participants',
      populate: {
        path: '_user',
        select: { '_id': 1, 'fname': 1, 'lname': 1, 'email': 1, 'username': 1 }
      }
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
      path: '_conversation',
      select: { '_id': 1, 'title': 1, 'type': 1, '_author': 1 }
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
      path: 'participants',
      populate: {
        path: '_user',
        select: { '_id': 1, 'fname': 1, 'lname': 1, 'email': 1, 'username': 1 }
      }
    })
    .exec((err, conversations) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, conversations: conversations});
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
        const addParticipantToConvo = await ParticipantHelper.addParticipantToConversation(_user, conversation._id);
        if (addParticipant.err || addParticipantToConvo.err) {
          return resolve({err: 'There is a problem in updating conversation'});
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
      const deleteParticipants = await ParticipantHelper.deleteAllParticipants(_id);
      if (deleteParticipants.err) {
        return resolve({err: err});
      }
      resolve({err: null, conversation: conversation});
    });
  });
};

const addParticipant = (_user, _conversation) => {
  return new Promise(async(resolve, reject) => {
    try {
      const newParticipant = ParticipantHelper.newParticipant(_user, _conversation);
      const addParticipantToConvo = ParticipantHelper.deleteParticpantToConversation(_user, _conversation);
      if (newParticipant.err || addParticipantToConvo.err) {
        return resolve({err: 'Error in adding new participant'});
      }
      resolve({err: null, participant: newParticipant.participant });
    }
    catch (e) {
      reject(e);
    }
  });
};

removeParticipant = (_user, _conversation) => {
  return new Promise(async(resolve, reject) => {
    try {
      const deleteParticipant = await ParticipantHelper.deleteParticipant(_user, _conversation);
      const deleteParticipantToConvo = await ParticipantHelper.deleteParticpantToConversation(_user, _conversation);
      if (deleteParticipant.err || deleteParticipantToConvo.err) {
        return resolve({err: 'error in deleting participant'});
      }
      resolve({err: null, participant: deleteParticipant.participant});
    }
    catch (e) {
      reject(e);
    }
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
  removeParticipant: removeParticipant
};
