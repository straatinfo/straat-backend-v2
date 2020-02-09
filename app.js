const express = require('express');
const path = require('path');
const validator = require('express-validator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const route = require('./routes');
const cors = require('cors');
const config = require('./config');
const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: 'straat.info-backend',
  stream: process.stdout,
  level: 'info'
});

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(config.db, { useNewUrlParser: true, retryWrites: false });

const Role = require('./models/Role');
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((req, res, next) => {
  req.$scope = {};
  req.db = require('./models');
  req.lib = require('./lib');
  req.log = log;
  req.$middlewares = {};
  next();
});

app.use(validator());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(require('./utils/tokenTrimmer'));
app.use(passport.initialize());
app.use(passport.session());

route(app);

app.listen(PORT, () => {
  log.info(`Server is listening on port: ${PORT}`);
});
