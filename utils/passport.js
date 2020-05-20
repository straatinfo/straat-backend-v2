const passport = require('passport');
const db = require('../models');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const localOptions = { usernameField: 'loginName' };

const localLogin = new LocalStrategy(localOptions, async function (loginName, password, done) {
  try {
    const user = await db.User.findOne({
      $or: [
        { email: loginName },
        { username: loginName }
      ]
    });
    if (!user || !user._id) {
      return done(null, false);
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return done(null, false);
    }
    return done(null, user);
  }
  catch (e) {
    return done(e);
  }
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.session_secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async function (payload, done) {
  try {
    const user = await (await db.User.findById(payload.sub).populate('_role').exec());
    if (!user) { 
      return done(null, false);
    }
    done(null, user);
  }
  catch (e) {
    return done(e, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);
