const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const AdminMiddleware = require('../middlewares/admin.middleware');
const Priority = require('../api/priority');
const PriorityRoute = express.Router();

PriorityRoute.route('/')
.get(requireAuth, Priority.getUrgencies)
.post(requireAuth, Priority.createPriority);

PriorityRoute.route('/:id')
.put(requireAuth, Priority.updatePriority)
.delete(requireAuth, Priority.deletePriority);

module.exports = PriorityRoute;
