const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Conversation = require('../api/conversation');
const ConversationRoute = express.Router();

ConversationRoute.route('/')
.get(/*requireSignin,*/ Conversation.getConversations)
.post(/*requireSignin,*/ Conversation.createConversation);

ConversationRoute.route('/:id')
.get(/*requireSignin,*/ Conversation.getConversationById)
.put(/*requireSignin,*/ Conversation.updateConversation)
.delete(/*requireSignin,*/ Conversation.deleteConversation);

ConversationRoute.route('/user/:userId')
.get(/*requireSignin,*/ Conversation.getUserConversations);

ConversationRoute.route('/:userId/:conversationId')
.post(/*requireSignin,*/ Conversation.addParticipant)
.delete(/*requireSignin,*/ Conversation.removeParticipant);

module.exports = ConversationRoute;
