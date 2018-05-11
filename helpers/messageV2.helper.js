/**
 * messageV2.helper.js
 * Created by: John Higgins M. Avila
 * Description: This Helper will will contain message related functions
 * 
 */

 // Dependencies
 const User = require('../models/User');
 const Conversation = require('../models/Conversation');
 const Message = require('../models/Message');
 const Team = require('../models/Team');
 const TeamMember = require('../models/TeamMember');
 const Report = require('../models/Report');
 const ConversationHelper = require('./conversationV2.helper');
 
// Private functions

async function __addReporterToConversation (_conversation, _reporter) {
  try {
    const conversation = await Conversation.findById(_conversation).populate('_report');
    if (!conversation._report) {
      return Promise.resolve(conversation);
    }
    // filter here if user must add to convo first 


    // check if user already member 
    if (conversation.participants.find(party => party._user.toString() === _reporter.toString())){
      console.log('%s is member of %s', _reporter, _conversation)
     // const populatedConvo = await __getConversationById(checkConvo._id);
     // console.log('populatedConvo', populatedConvo)
      return Promise.resolve({});
      // return Promise.resolve(checkConvo);
    }
  
    const addParticipant = await ConversationHelper.__addParticipant(_conversation, _reporter);
    return Promise.resolve(addParticipant);
  }
  catch (e) {
    return Promise.reject(e);
  }
}
async function __getMessages(_conversation, _reporter) {
  console.log(_reporter)
  try {
    const addParticipant = await __addReporterToConversation(_conversation, _reporter);
    const messages = await Message.find({ '_conversation': _conversation }).populate('_author', ['fname', 'lname', 'username', '_id']).populate('attachments');
    return Promise.resolve(messages);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __getMessageById(_message) {
  try {
    const message = await Message.findOne({'_id': _message}).populate('_author', ['fname', 'lname', 'username', '_id']).populate('attachments');
    return Promise.resolve(message);
  }
  catch (e) {
    return Promise.reject(e);
  }
}
 
async function __getLatestMessages(_conversation, _reporter, page = 1, items = 10) {
  try {
    const addParticipant = await __addReporterToConversation(_conversation, _reporter);
    const getPage = Math.max(0, page);
    const messages = await Message.find({ '_conversation': _conversation })
    .populate('_author', ['fname', 'lname', 'username', '_id'])
    .populate('attachments').limit(items).sort({'createdAt': -1}).skip(items * getPage);
    return Promise.resolve(messages);
  }
  catch (e) {
    return Promise.reject(e);
  }
}
async function __createMessage(_conversation, _author, body, attachments = []) {
  try {
    const newMessage = new Message({
      '_author': _author,
      'body': body,
      '_conversation': _conversation,
      'attachments': attachments
    });
    console.log(newMessage);
    const saveMessage = await newMessage.save();
    const message = await __getMessageById(saveMessage._id);
    const updateConversation = await Conversation.update({'_id': message._conversation}, { '$addToSet': { 'messages': message._id } });
    return Promise.resolve(message);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __updateMessage(_message, body) {
  try {
    const updateMessage = await Message.findByIdAndUpdate(_message, { 'body': body });
    const message = await __getMessageById(_message);
    return Promise.resolve(message);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __deleteMessage(_message) {
  try {
    const checkMessage = await __getMessageById(_message);
    if (!checkMessage) {
      return Promise.reject({
        status: 0,
        error: 'MESSAGE_NOT_FOUND',
        message: 'Cannot find message',
        statusCode: 404
      });
    }
    const message = await Message.findByIdAndRemove(_message);
    return Promise.resolve(message);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

function getMessage () {
  console.log(arguments)
  if (arguments[0].toLowerCase() === 'all') {
    return __getMessages(arguments[1], arguments[2]);
  } else if (arguments[0].toLowerCase() === 'byid') {
    return __getMessageById(arguments[1]);
  } else if (arguments[0].toLowerCase() === 'latest') {
    return __getLatestMessages(arguments[1], arguments[2], arguments[3], arguments[4])
  } else {
    return Promise.reject({ statusCode: 404, error: 'INVALID_KEYWORD', message: 'Invalid first argument' });
  }
}

function createMessage() {
  return __createMessage(arguments[1], arguments[2], arguments[3], arguments[4])
}

function updateMessage() {
  return __updateMessage(arguments[1], arguments[2]);
}

function deleteMessage() {
  return __deleteMessage(arguments[1]);
}

 module.exports = {
   __getMessages,
   __createMessage,
   __updateMessage,
   __deleteMessage,
   getMessage,
   createMessage,
   updateMessage,
   deleteMessage
 };
