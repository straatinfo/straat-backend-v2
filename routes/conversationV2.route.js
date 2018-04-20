const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Conversation = require('../api/conversationV2');
const ConversationRoute = express.Router();
const ConversationValidation = require('../validation/conversation.validation');
const ExpressJoi = require('express-joi-validator');

ConversationRoute.route('/')
.get(ExpressJoi(ConversationValidation.getSchema), Conversation.getConversation)
.post(ExpressJoi(ConversationValidation.createSchema), Conversation.createConversation);

ConversationRoute.route('/:_conversation')
.put(ExpressJoi(ConversationValidation.updateSchema), Conversation.updateConversation)
.delete(ExpressJoi(ConversationValidation.deleteSchema), Conversation.deleteConversation);

module.exports = ConversationRoute;
