const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const AdminMiddleware = require('../middlewares/admin.middleware');
const IncidentType = require('../api/incidentType');
const IncidentTypeRoute = express.Router();

IncidentTypeRoute.route('/')
.get(requireAuth, IncidentType.getIncidentTypes) // get the list of incident Type for the reporter to choose.
.post(requireAuth, AdminMiddleware.checkIfAdmin, IncidentType.createdIncidentType); // the admin can add incident type.

IncidentTypeRoute.route('/:id')
.put(requireAuth, AdminMiddleware.checkIfAdmin, IncidentType.updateIncidentType) // Admin can edit the incident type.
.delete(requireAuth, AdminMiddleware.checkIfAdmin, IncidentType.deleteIncidentType); // Admin can delete incident Type

module.exports = IncidentTypeRoute;
