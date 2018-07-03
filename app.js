const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');
const Route = require('./routes');
const TokenService = require('./service/token.service');
const ReportHousekeeping = require('./middleware/housekeeping/report.housekeeping');
const cors = require('cors');
const Config = require('./config');
var Boom = require('./middleware/error-handling/boom');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(Config.DATA_BASE, {useMongoClient: true});
    
const Role = require('./models/Role');
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger('dev'));
app.use(morgan());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: Config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(TokenService.tokenTrimmer);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // res.locals.login = req.isAuthenticated();
  // res.locals.session = req.session;
  next();
});

Route(app);
app.use(Boom);

setInterval(function () {
  ReportHousekeeping.updateExpiredReports();
}, 43200000);

setInterval(function () {
  ReportHousekeeping.backupDB();
}, 1000 * 10);

module.exports = app;
