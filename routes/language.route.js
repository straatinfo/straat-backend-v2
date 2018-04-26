const express = require('express');
const passport = require('passport');
require('../service/passport.service');
const requireAuth = passport.authenticate('jwt', {session: false});
const Language = require('../api/language');
const LanguageRoute = express.Router();
const ExpressJoi = require('express-joi-validator');
const LanguageValidation = require('../validation/language.validation');

LanguageRoute.route('/')
.get(ExpressJoi(LanguageValidation.getSchema), Language.getTranslation)
.post(ExpressJoi(LanguageValidation.postSchema), Language.addTranslation)
.put(ExpressJoi(LanguageValidation.putSchema), Language.editTranslation);

module.exports = LanguageRoute;
