const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Incident = require('../api/incident');
const IncidentRoute = express.Router();

IncidentRoute.route('/')
.get(requireAuth, Incident.getLatestIncident) // will get the latest 100 reports
.post(requireAuth, Incident.reportIncident);

IncidentRoute.route('/page/:pageNumber/:itemPerPage')
.get(requireAuth, Incident.getLatestIncidentByPage);

IncidentRoute.route('/category/:incidentType')
.get(requireAuth, Incident.getIncidentByIncidentType);

IncidentRoute.route('/category/:incidentType/page/:pageNumber/:itemPerPage')
.get(requireAuth, Incident.getIncidentByIncidentTypeByPage);

module.exports = IncidentRoute;
