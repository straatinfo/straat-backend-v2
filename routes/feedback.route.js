const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Feedback = require('../api/feedback');
const FeedbackRoute = express.Router();
const FeedbackValidator = require('../validator/feedback.validator');


FeedbackRoute.route('/:userId')
.post(/* requireAuth, */ FeedbackValidator.feedbackFormValidator, Feedback.sendFeedBack);

module.exports = FeedbackRoute;
