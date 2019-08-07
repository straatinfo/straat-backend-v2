const ConversationHelper = require('../helpers/conversationV2.helper')
const MessageHelper = require('../helpers/messageV2.helper')
const SocketHelper = require('../helpers/socket.helper')
const User = require('../models/User');
const UnreadMessage = require('../models/UnreadMessage');

const onSendMessage = async (io, socket, userData, args = {}, callback) => {
  console.log('onSendMessage: ', args)


  try {
    const { user, text, _conversation, _id, _report, _team, type } = args
    if (!_conversation) {
      console.log('Error: Invalid conversation ID')
      return io.to(socket.id).emit('send-message-v2', {
        status: 0,
        message: 'Failed to send Message'
      })
    }
    let userData;
    if (!user._id) {
      try {
        userData = await User.findById(user);
      } catch (e) {
        userData = { _id: user };
      }
    } else {
      userData = user;
    }
    const conversation = await ConversationHelper.__getConversationById(_conversation)
    const newMessage = await MessageHelper.__createMessage(_conversation, userData._id, text)
    const payload = {
      _id: newMessage._id,
      createdAt: newMessage.createdAt,
      user: userData,
      text: text,
      sourceId: _id
    }
    console.log('payload', payload)
    const toSend = {
      status: 1,
      message: 'Updated message',
      _conversation: _conversation,
      payload: payload,
      // conversation: {
      //   _id: conversation._id,
      //   title: conversation.title,
      //   type: conversation.type,
      //   _profilePic: conversation._profilePic
      // }
      conversation: conversation
    }
    conversation.participants.map(async function (p) {
      // send unread notification to participants

      if (type && p._user && p._user !== userData._id) {
        try {
          const unreadMessage = await UnreadMessage.create({
            _message: newMessage._id,
            _conversation: _conversation,
            _user: p._user,
            type: type,
            _team: _team,
            _report: _report
          });
        }
        catch (e) {
          // ignore error
        }
      }


      // notify participants that are active
      const findSocket = await SocketHelper.findSocketByUser(p._user)
      console.log('findSocket', p)
      if (findSocket.socket) {
        io.to(findSocket.socket._socket).emit('new-message', toSend)
      }
    })
    console.log('Success: Successfully updated listeners')
    io.to(socket.id).emit('send-message-v2', {
      status: 1,
      message: 'Successfully sent message',
      _conversation: _conversation,
      payload: payload
    })
  } catch (e) {
    io.to(socket.id).emit('send-message-v2', {
      status: 0,
      message: 'Failed to send Message'
    })
  }
}

module.exports = {
  onSendMessage
}
