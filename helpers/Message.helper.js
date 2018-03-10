const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const ConversationHelper = require('./conversation.helper');
const UserHelper = require('./user.helper');

const getConversationMessages = (_conversation) => {
  return new Promise((resolve, reject) => {
    Message.find({'_conversation': _conversation})
    .populate({
      path: '_author',
      select: { '_id': 1, 'email': 1, 'username': 1, 'fname': 1, 'lname': 1 }
    })
    .populate('_conversation')
    .populate('attachments')
    .limit(20)
    .sort({'createdAt': -1})
    .exec((err, messages) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, messages: messages});
    });
  });
};

const getConversationByPage = (_conversation, page) => {
  const getPage = Math.max(0, page)
  return new Promise((resolve, reject) => {
    Message.find({'_conversation': _conversation})
    .populate({
      path: '_author',
      select: { '_id': 1, 'email': 1, 'username': 1, 'fname': 1, 'lname': 1 }
    })
    .populate('_conversation')
    .populate('attachments')
    .limit(20)
    .sort({'createdAt': -1})
    .skip(20 * getPage)
    .exec((err, messages) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, messages: messages});
    });
  });
}

const sendMessage = (input) => {
  return new Promise((resolve, reject) => {
    const newMessage = new Message(input);
    newMessage.save(async(err, message) => {
      try {
        if (err) {
          return resolve({err: err});
        }
        // update _conversation
        // const updateConversation = await ConversationHelper.addMessageToConversation(message._conversation, message._id);
        // if (updateConversation.err) {
        //   return resolve({err: updateConversation.err});
        // }
        // update _author
        // const updateAuthor = await UserHelper.addMessageToUser(input._author, message._id);
        // if (updateAuthor.err) {
        //   return resolve({err: updateAuthor.err});
        // }
        Conversation.findByIdAndUpdate(message._conversation,
        { '$addToSet': { 'messages': message._id } },
        { 'new': true, 'upsert': true },
        (err, conversation) => {
          if (err) {
            return resolve({err: err});
          }
          resolve({err: null, message: message});
        });
      }
      catch (e) {
        console.log(e);
        reject(e);
      }
    });
  })
};

const updateMessage = (_id, body) => {
  return new Promise((resolve, reject) => {
    Message.findByIdAndUpdate(_id, {body: body}, (err, message) => {
      if (err) {
        return resolve({err: err});
      }
      Message.findById(message._id, (err, messageD) => {
        if (err) {
          return resolve({err: err});
        }
        resolve({err: null, message: messageD});
      });
    });
  });
};

const deleteMessage = (_id) => {
  return new Promise((resolve, reject) => {
    Message.findByIdAndRemove(_id, async(err, message) => {
      try {
        if (err) {
          return reslove({err: err});
        }
        if (!message) {
          return resolve({err: null, message: message});
        }
        // const deleteMessageToConvo = await ConversationHelper.removeMessageToConversation(message._conversation, message._id);
        // if (deleteMessageToConvo.err) {
        //   return resolve({err: deleteMessageToConvo.err});
        // }
        // const deleteMessageToUser = await UserHelper.removeMessageToUser(message._author, message._id);
        // if (deleteMessageToUser.err) {
        //   return resolve({err: deleteMessageToUser.err});
        // }
        Conversation.findByIdAndUpdate(message._conversation,
        { '$pop': { 'messages': message._id } },
        (err, conversation) => {
          if (err) {
            return resolve({err: err});
          }
          resolve({err: null, message:message});
        });
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

const deleteAllMessagesInConvo = (_conversation) => {
  return new Promise((resolve, reject) => {
    Message.find({'_conversation': _conversation})
    .remove((err, messages) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, messages: messages});
    });
  });
};

module.exports = {
  getConversationMessages: getConversationMessages,
  getConversationByPage: getConversationByPage,
  sendMessage: sendMessage,
  updateMessage: updateMessage,
  deleteMessage: deleteMessage,
  deleteAllMessagesInConvo: deleteAllMessagesInConvo
};