const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Incident = require('../api/incident');
const IncidentRoute = express.Router();

IncidentRoute.route('/')
.get(requireAuth, Incident.getLatestIncident) // will get the latest 100 reports
.post(requireAuth, Incident.reportIncident);

IncidentRoute.route('/:id')
.get(requireAuth, Incident.getIncidentById)
.put(requireAuth, Incident.updateIncident)
.delete(requireAuth, Incident.deleteIncident);

IncidentRoute.route('/page/:pageNumber/:itemPerPage')
.get(requireAuth, Incident.getIncidentByPage);

IncidentRoute.route('/category/:incidentType')
.get(requireAuth, Incident.getIncidentByIncidentType);

IncidentRoute.route('/category/:incidentType/page/:pageNumber/:itemPerPage')
.get(requireAuth, Incident.getIncidentByIncidentTypeByPage);

module.exports = IncidentRoute;
