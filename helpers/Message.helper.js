const Message = require('../models/Message');

const getConversationMessages = (_conversation) => {
  return new Promise((resolve, reject) => {
    Message.find({'_conversation': _conversation})
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
    newMessage.save((err, message) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, message: message});
    });
  })
};

const updateMessage = (_id, body) => {
  return new Promise((resolve, reject) => {
    Message.findByIdAndUpdate(_id, {body: body}, (err, message) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, message: message});
    });
  });
};

const deleteMessage = (_id) => {
  return new Promise((resolve, reject) => {
    Message.findByIdAndRemove(_id, (err, message) => {
      if (err) {
        return reslove({err: err});
      }
      resolve({err: null, message:message});
    });
  });
};

module.exports = {
  getConversationMessages: getConversationMessages,
  getConversationByPage: getConversationByPage,
  sendMessage: sendMessage,
  updateMessage: updateMessage,
  deleteMessage: deleteMessage
};