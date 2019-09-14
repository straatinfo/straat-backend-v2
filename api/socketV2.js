const Promise = require('bluebird');

const ConversationHelper = require('../helpers/conversationV2.helper')
const MessageHelper = require('../helpers/messageV2.helper')
const SocketHelper = require('../helpers/socket.helper')
const User = require('../models/User');
const UnreadMessage = require('../models/UnreadMessage');
const lib = require('../lib');

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


      // send message to firebase
      let userFC = await User.findById(p._user);
      userFC = userFC.toObject ? userFC.toObject() : userFC;
      let firebaseTokens = userFC.firebaseTokens;
      // firebaseTokens = firebaseTokens && firebaseTokens.toObect ? firebaseTokens.toObject() : firebaseTokens
      console.log('firebase tokens', firebaseTokens);
      console.log('Firebase token type', typeof firebaseTokens);
      if (firebaseTokens) {
        const messages = firebaseTokens.map((ft) => {
          console.log('fcmToken', ft);

          return {
            data: {
              text: text || '',
              _conversation: _conversation || '',
              _id: _id || '',
              _report: _report || '',
              _team: _team || '',
              type: type || ''
            },
            notification: {
              title: `New report update`,
              body: ``,
            },
            android: {
              ttl: 3600 * 1000,
              notification: {
                icon: 'ic_launcher',
                click_action: '.ReportsActivity',
                title: `New report update`,
                body: ``,
                // color: '#f45342',
                sound : 'default'
              }
            },
            token: ft.token
          }
        });

        console.log(messages);

        const sentMessages = await Promise.map(messages, async (msg) => {
          const sentM = await lib.fcm.sendAsync(msg).then((m) => {
            console.log(m);

            return m;
          });

          return sentM;
        });

        console.log('sent messages', sentMessages);
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
