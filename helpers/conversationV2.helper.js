/**
 * conversationV2.helper.js
 * Created by: John Higgins M. Avila
 * Description: This Helper will will contain conversation related functions
 * 
 */

 // Dependencies
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Team = require('../models/Team');
const TeamMember = require('../models/TeamMember');
const Report = require('../models/Report');
const ReportTrans = require('../transform/report.trans');
const _ = require('lodash');

// private functions
async function __getUserConversation(_user) {
  try {
    const user = await User.findById(_user);

    const conversations = await Promise.all(user.conversations.map(async (convoId) => {
      const conversation = await Conversation.findById(convoId).populate('_author', ['_id', 'username']);
      if (conversation) {
        const participants = await Promise.all(conversation.participants.map(async(p) => {
          const participant = await User.findById(p._user, ['_id', 'username']);
          return {...p.toObject(), _user: participant};
        }));
        return {...conversation.toObject(), participants: participants};
      }
    }));
    return Promise.resolve(_.filter(conversations, convo => { if (convo) { return convo; }}));
    // return Promise.resolve(user.conversations);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

// test get user conversation 
async function __getUserConversationV2(_user, type = false, types = '') {
  const match = type ? { match:{type: {$in: types.split(',')}}} : {}
  try {
    const user = await User.findById(_user,{_id: true}).populate({
      path: 'conversations',
      ...match,
      select: { messages: {$slice: -1}},
      options: { sort: { updatedAt: -1 }},
      populate: [{
        path:'_author',
        select: {_id: true, username: true}
      },{
        path:'participants._user',
        select: {_id: true, username: true},
        populate: {
          path:'_profilePic',
          select: {_id: true, secure_url: true}
          }
      },{
        path:'messages',
        populate: {
          path:'_author',
          select: {_id: true, username: true}
        }
      },{
        path:'_profilePic',
        select: {_id: true, secure_url: true}
      }]
    })
   // .populate('conversations.participants._user');
   
    return Promise.resolve(user ? user.conversations || [] : [])
    // const conversations = await Promise.all(user.conversations.map(async (convoId) => {
    //   const conversation = await Conversation.findById(convoId).populate('_author', ['_id', 'username']);
    //   if (conversation) {
    //     const participants = await Promise.all(conversation.participants.map(async(p) => {
    //       const participant = await User.findById(p._user, ['_id', 'username']);
    //       return {...p.toObject(), _user: participant};
    //     }));
    //     return {...conversation.toObject(), participants: participants};
    //   }
    // }));
    // return Promise.resolve(_.filter(conversations, convo => { if (convo) { return convo; }}));
    // return Promise.resolve(user.conversations);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __getUserConversationByType(_user, type) {
  try {
    const user = await User.findById(_user);
    const conversations = await Promise.all(user.conversations.map(async (convoId) => {
      const conversation = await Conversation.findById(convoId).populate('_author', ['_id', 'username']);
      if (conversation) {
        const participants = await Promise.all(conversation.participants.map(async(p) => {
          const participant = await User.findById(p._user, ['_id', 'username']);
          return {...p.toObject(), _user: participant};
        }));
        return {...conversation.toObject(), participants: participants};
      }
    }));
    const filterdConversations = _.filter(conversations, (convo) => {
      if(convo) {
        return convo.type.toLowerCase() === type.toLowerCase();
      }
    });
    return Promise.resolve(filterdConversations);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __getConversationById (_conversation) {
  try {
    const conversation = await Conversation.findById(_conversation).populate('_profilePic')
    .populate('_author', ['_id', 'username'])
    .populate({path: '_report', select: ['_id', '_reportType'], populate: {path: '_reportType', select: ['_id', 'name', 'code']}});
    
    if (!conversation) {
      return Promise.reject({
        statusCode: 404,
        code: 0,
        error: 'CONVERSATION_NOT_FOUND',
        message: 'cannot find conversation'
      })
    }
    const participants = await Promise.all(conversation.participants.map(async(p) => {
      const participant = await User.findById(p._user, ['_id', 'username']);
      return {...p.toObject(), _user: participant};
    }));
    return Promise.resolve({...conversation.toObject(), participants: participants});
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __createPrivateConversation(_chater, _chatee, _profilePic = null) {
  try {
    let Rconversation
    const membersArray = [_chatee, _chater];
    const sortedChatArray = membersArray.sort();
    const title = membersArray[0] + '|' + membersArray[1];
    const checkConvo = await Conversation.findOne({'title': title});
    let newConversation;
    if (checkConvo) {
      newConversation = checkConvo;
      Rconversation = await __getConversationById(checkConvo._id);
      return Promise.resolve(Rconversation);
    }
    else if (_profilePic) {
      newConversation = new Conversation({
        'type': 'PRIVATE',
        'title': title,
        '_author': _chater,
        '_profilePic': _profilePic,
        'participants': [
          { _user: _chater, isActive: true },
          { _user: _chatee, isActive: false }
        ]
      });
    } else {
      newConversation = new Conversation({
        'type': 'PRIVATE',
        'title': title,
        '_author': _chater,
        'participants': [
          { _user: _chater, isActive: true },
          { _user: _chatee, isActive: false }
        ]
      });
    }
    const updateChater = await User.update({'_id': _chater}, { '$addToSet': { 'conversations': newConversation._id } });
    const updateChatee = await User.update({'_id': _chatee}, { '$addToSet': { 'conversations': newConversation._id } });
    const conversation = await newConversation.save();
    Rconversation = await __getConversationById(conversation._id);

    return Promise.resolve(Rconversation);
    return Promise.resolve();
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __createTeamChat(_user, _team, _profilePic) {
  try {
    const team = await Team.findById(_team);
    if (!team) {
      return Promise.reject({
        statusCode: 404,
        error: 'INVALID_TEAM',
        message: 'Cannot find team with given ID'
      });
    }
    if (team._conversation) { //   && mongoose.Types.ObjectId.isValid(team._conversation) not need cause when saving to db record objectID type is required in _convrersation field
       const Rconversation = await __getConversationById(team._conversation);
       return Promise.resolve(Rconversation);
    }
    const participants = _.map(team.teamMembers, (tm) => {
      return {
        _user: tm._user,
        isActive: _user === tm._user
      }
    });
    let teamConversation;
    if (_profilePic) {
      teamConversation = new Conversation({
        'title': `Team Chat of ${team.teamName} team`,
        'type': 'TEAM',
        '_team': _team,
        '_author': _user,
        '_profilePic': _profilePic,
        'participants': participants
      });
    } else {
      teamConversation = new Conversation({
        'title': `Team Chat of ${team.teamName} team`,
        'type': 'TEAM',
        '_team': _team,
        '_author': _user,
        'participants': participants
      });
    }
    const conversation = await teamConversation.save();
    const updateUsers = await Promise.all(team.teamMembers.map(async (tm) => {
      const updateChater = await User.update({'_id': tm._user}, { '$addToSet': { 'conversations': conversation._id } });
    }));
    const updateTeam = await Team.findByIdAndUpdate(_team, { '_conversation': conversation._id });
    return Promise.resolve(conversation);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __createReportChat (_user, _team, _report, _profilePic) {
  try {

    const checkConvo = await Conversation.findOne({_report: _report});
   
    if (checkConvo) {
      return Promise.resolve(checkConvo);
    }

    const team = await Team.findById(_team).populate('teamMembers');
    if (!team) {
      return Promise.reject({
        statusCode: 404,
        error: 'INVALID_TEAM',
        message: 'Cannot find team with given ID'
      });
    }
    const participants = _.map(team.teamMembers, (tm) => {
      return {
        _user: tm._user,
        isActive: _user === tm._user
      }
    });
    let reportConversation;
    
    // get report chat ttile first
    const report = await Report.findById(_report).populate('_mainCategory', ['name'])
    const title = ReportTrans.getReportChatTitle(report)

    if (_profilePic) {
      reportConversation = new Conversation({
        'title': title,
        '_author': _user,
        'type': 'REPORT',
        '_report': _report,
        '_profilePic': _profilePic,
        'participants': participants
      });
    } else {
      reportConversation = new Conversation({
        'title': title,
        'type': 'REPORT',
        '_author': _user,
        '_report': _report,
        '_profilePic': _profilePic,
        'participants': participants
      });
    }
    const conversation = await reportConversation.save();
    const updateReport = await Report.findByIdAndUpdate(_report, {'_conversation': conversation._id});
    const updateUsers = await Promise.all(team.teamMembers.map(async (tm) => {
      const updateChater = await User.update({'_id': tm._user}, { '$addToSet': { 'conversations': conversation._id } });
    }));
    return Promise.resolve(conversation);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __createGroupChat(_author, title, _profilePic = null) {
  try {
    let newConversation;
    if (_profilePic) {
      newConversation = new Conversation({
        'type': 'GROUP',
        'title': title,
        '_author': _author,
        '_profilePic': _profilePic,
        'participants': [{
          '_user': _author,
          isActive: true
        }]
      });
    } else {
      newConversation = new Conversation({
        'type': 'GROUP',
        'title': title,
        '_author': _author,
        'participants': [{
          '_user': _author,
          isActive: true
        }]
      });
    }
    const conversation = await newConversation.save();
    const updateUser = await User.update({'_id': _author}, { '$addToSet': { 'conversations': conversation._id } });
    return Promise.resolve(conversation);
  }
  catch (e) {
    return Promise.reject(e);
  }
}
 
async function __addParticipant(_conversation, _user) {
  try {
    const checkConvo = await Conversation.findById(_conversation);
    if (!checkConvo) {
      return Promise.reject({
        status: 0,
        statusCode: 404,
        error: 'INVALID_CONVERSATION',
        message: 'Cannot find conversation'
      });
    }
    const conversation = await Conversation.findById(_conversation);
    if (conversation.type.toUpperCase() === 'PRIVATE') {
      return Promise.reject({
        status: 0,
        statusCode: 400,
        error: 'PARTICIPANT_MAX',
        message: 'Cannot add another participant with private message'
      });
    }

//     // check if user already member 
//     if (checkConvo.participants.find(party => party._user.toString() === _user.toString())){
//       console.log('%s is member of %s', _user, _conversation)
//      // const populatedConvo = await __getConversationById(checkConvo._id);
//      // console.log('populatedConvo', populatedConvo)
//       return Promise.resolve({});
//       // return Promise.resolve(checkConvo);
//     }
// //return
     console.log('%s is not member of %s', _user, _conversation)
    
    const newParticipant = { '_user': _user, isActive: false };
    const updatedConversation = await Conversation.update(
      { '_id': checkConvo._id },
      { '$addToSet': { 'participants': newParticipant  } });

    // const populatedConvo = await __getConversationById(checkConvo._id);
///console.log('populatedConvo.participants', populatedConvo.participants)

   // const trimedData = _.uniqBy(populatedConvo.participants, (e) => { return e._user.toString(); });
  //  const trimedConversation = await Conversation.update({'_id': _conversation}, {'participants': trimedData});

    const populatedConvo2 = await __getConversationById(checkConvo._id);
    const updateUser = await User.update({'_id': _user}, { '$addToSet': { 'conversations': conversation._id } });
    return Promise.resolve(populatedConvo2);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __removeParticipant(_conversation, _remover, _user, isLeavingTeam = false) {
  try {
    const checkConvo = await Conversation.findById(_conversation);
    if (!checkConvo) {
      return Promise.reject({
        status: 0,
        statusCode: 404,
        error: 'INVALID_CONVERSATION',
        message: 'Cannot find conversation'
      });
    }
    const conversation = await Conversation.findById(_conversation);
    if (conversation._author.toString() === _remover || _remover === _user || isLeavingTeam) {
      const newParticipants = _.remove(checkConvo.participants, (p) => {
        return p._user.toString() !== _user;
      });
      const updatedConversation = await Conversation.update(
        { '_id': _conversation },
        { 'participants': newParticipants });
      const populatedConvo = await __getConversationById(checkConvo._id);
      const updateUser = await User.update({'_id': _user}, { '$pop': { 'conversations': checkConvo._id } });
      return Promise.resolve(populatedConvo);
    } else {
      return Promise.reject({
        status: 0,
        error: 'UNAUTHORIZED_ACTION',
        message: 'Unauthorized to remove a user in conversation',
        statusCode: 401
      });
    }
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __setUserActivity (_conversation, _user, isActive) {
  try {
    const checkConvo = await Conversation.findById(_conversation);
    if (!checkConvo) {
      return Promise.reject({
        status: 0,
        statusCode: 404,
        error: 'INVALID_CONVERSATION',
        message: 'Cannot find conversation'
      });
    }
    const updateConvo = await Conversation.update(
      { '_id': _conversation, 'participants._user': _user },
      { $set: { 'participants.$.isActive': isActive } }
    );
    const conversation = await __getConversationById(updateConvo._id);
    return Promise.resolve(conversation);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

async function __updateConversation(_conversation, title, _profilePic = null) {
  try {
    const checkConvo = await Conversation.findById(_conversation);
    if (!checkConvo) {
      return Promise.reject({
        status: 0,
        statusCode: 404,
        error: 'INVALID_CONVERSATION',
        message: 'Cannot find conversation'
      });
    }
    if (checkConvo.type === 'PRIVATE') {
      return Promise.reject({
        status: 0,
        statusCode: 401,
        error: 'UPDATE_CHAT_ERROR',
        message: 'Private chats cannot be updated'
      });
    }
    let updateConvo;
    if (_profilePic) {
      updateConvo = await Conversation.findByIdAndUpdate(_conversation, { 'title': title, '_profilePic': _profilePic });
    } else {
      updateConvo = await Conversation.findByIdAndUpdate(_conversation, { 'title': title });
    }
    const conversation = await __getConversationById(updateConvo._id);
    return Promise.resolve(conversation);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

function getConversation () {
  if (arguments[0].toLowerCase() === 'userconversations') {
    console.log(1);
    return __getUserConversation(arguments[1]);
  } else if (arguments[0].toLowerCase() === 'conversation') {;
    console.log(2)
    return __getConversationById(arguments[1]);
  } else if (arguments[0].toLowerCase() === 'userconversationsbytype') {
    console.log(3);
    return __getUserConversationByType(arguments[1], arguments[2]);
  } else {
    return Promise.reject({ statusCode: 404, message: 'Invalid arguments on conversation helper' });
  }
}

function createConversation () {
  if (arguments[0].toLowerCase() === 'private') {
    return __createPrivateConversation(arguments[1], arguments[2]);
  } else if (arguments[0].toLowerCase() === 'team') {
    return __createTeamChat(arguments[1], arguments[2]);
  } else if (arguments[0].toLowerCase() === 'group') {
    return __createGroupChat(arguments[1], arguments[2]);
  } else {
    return Promise.reject({ statusCode: 404, message: 'Invalid arguments on creating conversation' });
  }
}

function updateConversation () {
  if (arguments[0].toLowerCase() === 'update') {
    return __updateConversation(arguments[1], arguments[2], arguments[3] = null);
  } else if (arguments[0].toLowerCase() === 'add') {
    return __addParticipant(arguments[1], arguments[2]);
  } else if (arguments[0].toLowerCase() === 'remove') {
    return __removeParticipant(arguments[1], arguments[2], arguments[3]);
  } else if (arguments[0].toLowerCase() === 'setactivity') {
    return __setUserActivity(arguments[1], arguments[2], arguments[3]);
  } else {
    return Promise.reject({ statusCode: 404, message: 'Invalid arguments on updating conversation' })
  }
}

async function deleteConversation (_conversation, _user) {
  try {
    const conversation = await Conversation.findById(_conversation);
    if (!conversation) {
      return Promise.reject({
        status: 0,
        statusCode: 404,
        error: 'INVALID_CONVERSATION',
        message: 'Cannot find conversation'
      });
    }
    if (conversation._author.toString() != _user.toString()) {
      return Promise.reject({
        status: 0,
        statusCode: 401,
        error: 'UNATHORIZED_USER',
        message: 'The user is not authorized to delete conversation'
      });
    }
    const deleteConvo = await Conversation.findByIdAndRemove(_conversation);
    return Promise.resolve(deleteConvo);
  }
  catch (e) {
    return Promise.reject(e);
  }
}

module.exports = {
  __getConversationById,
  __getUserConversationByType,
  __getUserConversation,
  __createGroupChat,
  __createPrivateConversation,
  __createReportChat,
  __createTeamChat,
  __updateConversation,
  __removeParticipant,
  __addParticipant,
  __setUserActivity,
  getConversation,
  createConversation,
  updateConversation,
  deleteConversation,

  __getUserConversationV2
};
