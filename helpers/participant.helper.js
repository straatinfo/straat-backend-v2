const Participant = require('../models/Participant');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

const newParticipant = (_user, _conversation) => {
  return new Promise((resolve, reject) => {
    Participant.findOne({'_conversation': _conversation, '_user': _user}, (err, participant) => {
      if (err) {
        return resolve({err: err});
      }
      if (participant) {
        return resolve({err: null, participant: participant});
      }
      const newParticipant = new Participant({'_conversation': _conversation, '_user': _user});
      newParticipant.save((err, participant) => {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null, participant: participant});
      });
    });
  });
};

const addParticipantToConversation = (_participant, _conversation) => {
  return new Promise((resolve, reject) => {
    Conversation.findByIdAndUpdate(_conversation,
    { '$addToSet': { 'participants': _participant } },
    { 'new': true, 'upsert': true },
    (err, conversation) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, conversation});
    });
  });
};

const addParticipantToUser = (_participant, _user) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(_user,
    { '$addToSet': { 'participants': _participant } },
    { 'new': true, 'upsert': true },
    (err, user) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, user: user});
    })
  });
}

const deleteParticipant = (_user, _conversation) => {
  return new Promise((resolve, reject) => {
    Participant.findOneAndRemove({'_conversation': _conversation, '_user': _user}, (err, participant) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, participant: participant});
    });
  });
};

const deleteParticpantToConversation = (_user, _conversation) => {
  return new Promise((resolve, reject) => {
    Conversation.findByIdAndUpdate(_conversation,
    { '$pop': { 'participants': _user } },
    (err, conversation) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, conversation: conversation});
    });
  });
};

const deleteAllParticipants = (_conversation) => {
  return new Promise((resolve, reject) => {
    Participant.find({'_conversation':_conversation})
    .remove((err) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null});
    })
  });
}

const activateParticipant = (_user, _conversation, activate = true) => {
  return new Promise((resolve, reject) => {
    Participant.findOneAndUpdate({'_user': _user, '_conversation': _conversation }, {'isActive': activate}, (err, participant) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, participant: participant});
    });
  });
}

const deactivateParticipant = (_user) => {
  return new Promise((resolve, reject) => {
    Participant.find({'_user': _user}, async (err, participants) => {
      try {
        const updateP = await Promise.all(participants.map(async(p) => {
          const deactivateP = await activateParticipant(p._user);
          return deactivateP.participant;
        }));
        resolve({err: null,  participants: participants});
      }
      catch (e) {
        reject(e);
      }
    });
  });
}

module.exports = {
  newParticipant: newParticipant,
  addParticipantToConversation: addParticipantToConversation,
  deleteParticpantToConversation: deleteParticpantToConversation,
  deleteParticipant: deleteParticipant,
  deleteAllParticipants: deleteAllParticipants,
  addParticipantToUser: addParticipantToUser,
  activateParticipant: activateParticipant,
  deactivateParticipant: deactivateParticipant
};