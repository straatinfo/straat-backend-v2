const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Message = require('../api/messageV2');
const MessageRoute = express.Router();
const ExpressJoi = require('express-joi-validator');
const MessageValidation = require('../validation/message.validation');

MessageRoute.route('/')
.get(ExpressJoi(MessageValidation.getSchema), Message.getMessages)
.post(ExpressJoi(MessageValidation.createSchema), Message.createMessage);

MessageRoute.route('/:_message')
.get(ExpressJoi(MessageValidation.getSchema), Message.getMessages)
.put(ExpressJoi(MessageValidation.updateSchema), Message.updateMessage)
.delete(Message.deleteMessage);

module.exports = MessageRoute;
