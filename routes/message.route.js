const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Message = require('../api/message');
const MessageRoute = express.Router();

MessageRoute.route('/')
.post(/*requireSignin,*/ Message.createMessage);

MessageRoute.route('/:id')
.put(/*requireSignin,*/ Message.updateMessage)
.delete(/*requireSignin,*/ Message.deleteMessage);

MessageRoute.route('/conversation/:conversationId')
.get(/*requireSignin,*/ Message.getConversationMessages);

MessageRoute.route('/conversation/:conversationId/:pageNumber')
.get(/*requireSignin,*/ Message.getConversationMessagesByPage);

module.exports = MessageRoute;
