const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const AdminMiddleware = require('../middlewares/admin.middleware');
const Urgency = require('../api/urgency');
const UrgencyRoute = express.Router();

UrgencyRoute.route('/')
.get(requireAuth, Urgency.getUrgencies)
.post(requireAuth, Urgency.createUrgency);

UrgencyRoute.route('/:id')
.put(requireAuth, Urgency.updateUrgency)
.delete(requireAuth, Urgency.deleteUrgency);

module.exports = UrgencyRoute;
