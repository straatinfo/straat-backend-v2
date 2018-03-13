const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Design = require('../api/design');
const DesignRoute = express.Router();
const DesignMiddleware = require('../middleware/design.middleware');
const CloudinaryService = require('../service/cloudinary.service');

DesignRoute.route('/host/:hostId')
.get(/*requireAuth,*/ Design.getDesigns, DesignMiddleware.getFlatDesigns)
.post(/*requireAuth,*/ Design.createDesign);

DesignRoute.route('/:id')
.get(/*requireAuth,*/ Design.getDesignById)
.post(CloudinaryService.singleUpload('host-logo', 'designs'), /*requireAuth,*/Design.addLogo)
.put(/*requireAuth,*/ Design.updateDesign)
.delete(/*requireAuth,*/ Design.deleteDesign);

DesignRoute.route('/activeDesign/:hostId/:designId')
.put(/*requireAuth,*/ Design.setActiveDesign);


module.exports = DesignRoute;
