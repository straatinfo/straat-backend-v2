const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Design = require('../api/design');
const DesignRoute = express.Router();
const CloudinaryService = require('../service/cloudinary.service');

DesignRoute.route('/host/:hostId')
.get(/*requireSignin,*/ Design.getDesigns)
.post(/*requireSignin,*/ Design.createDesign);

DesignRoute.route('/:id')
.get(/*requireSignin,*/ Design.getDesignById)
.post(CloudinaryService.singleUpload('host-logo'), /*requireSignin,*/ Design.addLogo)
.put(/*requireSignin,*/ Design.updateDesign)
.delete(/*requireSignin,*/ Design.deleteDesign);


module.exports = DesignRoute;
