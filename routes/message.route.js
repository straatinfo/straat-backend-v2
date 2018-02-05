const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Message = require('../api/message');
const MessageRoute = express.Router();

MessageRoute.route('/')
.post(requireAuth, Message.createMessage);

MessageRoute.route('/:id')
.put(requireAuth, Message.updateMessage)
.delete(requireAuth, Message.deleteMessage);

MessageRoute.route('/conversation/:conversationId')
.get(requireAuth, Message.getConversationMessages);

MessageRoute.route('/conversation/:conversationId/:pageNumber')
.get(requireAuth, Message.getConversationMessagesByPage);

module.exports = MessageRoute;
