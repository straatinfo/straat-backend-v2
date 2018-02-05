const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Conversation = require('../api/conversation');
const ConversationRoute = express.Router();

ConversationRoute.route('/')
.get(requireAuth, Conversation.getConversations)
.post(requireAuth, Conversation.createConversation);

ConversationRoute.route('/:id')
.get(requireAuth, Conversation.getConversationById)
.put(requireAuth, Conversation.updateConversation)
.delete(requireAuth, Conversation.deleteConversation);

ConversationRoute.route('/user/:userId')
.get(requireAuth, Conversation.getUserConversations);

ConversationRoute.route('/:userId/:conversationId')
.post(requireAuth, Conversation.addParticipant)
.delete(requireAuth, Conversation.removeParticipant);

module.exports = ConversationRoute;
