const express = require('express')
const passport = require('passport')
require('../service/passport.service')
const requireAuth = passport.authenticate('jwt', {session: false})
const hostMigration = require('../api/hostMigration')
const HostMigrationRoute = express.Router()
const FlatHost = require('../middleware/flatHost')
const ExpressJoi = require('express-joi-validator')
const HostValidation = require('../validation/host.validation')


// HostMigrationRoute.route('/migrate')
// .get(/* requireAuth, */ hostMigration.migrate)


// for testing 
// HostMigrationRoute.route('/intersect')
// .get(/* requireAuth, */ hostMigration.intersect)

// HostMigrationRoute.route('/validateCity/:city')
// .get(/* requireAuth, */ hostMigration.validateCity)




module.exports = HostMigrationRoute
