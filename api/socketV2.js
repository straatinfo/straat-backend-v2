const ConversationHelper = require('../helpers/conversationV2.helper')
const MessageHelper = require('../helpers/messageV2.helper')
const SocketHelper = require('../helpers/socket.helper')
const onSendMessage = async (io, socket, userData, args = {}, callback) => {
  console.log('onSendMessage: ', args)


  try {
    const { user, text, _conversation, _id } = args
    if (!_conversation) {
      console.log('Error: Invalid conversation ID')
      return io.to(socket.id).emit('send-message-v2', {
        status: 0,
        message: 'Failed to send Message'
      })
    }
    const conversation = await ConversationHelper.__getConversationById(_conversation)
    const newMessage = await MessageHelper.__createMessage(_conversation, user._id, text)
    const payload = {
      _id: newMessage._id,
      createdAt: newMessage.createdAt,
      user: user,
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
