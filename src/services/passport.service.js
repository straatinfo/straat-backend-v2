const passport = require('passport');
const Op = require('sequelize').Op;
const db = require('../models');
const config = require('../config/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const localOptions = { usernameField: 'loginName'};
const { user } = db;
const localLogin = new LocalStrategy(localOptions, function (loginName, password, done) {
  user.findOne({
    where:{
      [Op.or]: [{username: loginName}, {email: loginName}]
    }
  })
  .then(user => {
    if(!user){return done(null, false);}

    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (err) {return done(err);}
      if (!isMatch) {return done(null, false);}
      return done(null, user);
    });

  })
  .catch(err => {
    return done(err);
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  user.findOne({
    where:{
      id: payload.sub
    }
  })
  .then(user => {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
  .catch(err => {
    return done(err, false);
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
