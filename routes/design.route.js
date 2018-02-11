const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Design = require('../api/design');
const DesignRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');

DesignRoute.route('/host/:hostId')
.get(/*requireAuth,*/ Design.getDesigns)
.post(/*requireAuth,*/ Design.createDesign);

DesignRoute.route('/:id')
.get(/*requireAuth,*/ Design.getDesignById)
.post(CloudinaryService.singleUpload('host-logo'), /*requireAuth,*/Design.addLogo)
.put(/*requireAuth,*/ Design.updateDesign)
.delete(/*requireAuth,*/ Design.deleteDesign);


module.exports = DesignRoute;
