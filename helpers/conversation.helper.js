const Participant = require('../models/Participant');
const Conversation = require('../models/Conversation');

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

const createConversation = (input) => {
  return new Promise((resolve, reject) => {
    const newConversation = new Conversation(input);
    newConversation.save((err, conversation) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, conversation: conversation});
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
    Conversation.findByIdAndRemove(_id, (err, conversation) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, conversation: conversation});
    });
  });
};

const addParticipant = (_conversation, _user) => {
  return new Promise((resolve, reject) => {
    Participant.findOne({'_conversation': _conversation, '_user': _user}, (err, participant) => {
      if (err) {
        return resolve({err: err});
      }
      if (participant) {
        return resolve({err: null});
      }
      const newParticipant = new Participant({'_conversation': _conversation, '_user': _user});
      newParticipant.save((err, participant) => {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null});
      });
    });
  });
};

const removeParticipant = (_conversation, _user) => {
  return new Promise((resolve, reject) => {
    Participant.remove({'_conversation': _conversation, '_user': _user}, (err) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
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
  removeParticipant: removeParticipant
};
