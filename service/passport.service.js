const passport = require('passport');
const UserHelper = require('../helpers/user.helper');
const User = require('../models/User');
const Config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const localOptions = { usernameField: 'loginName'};

const localLogin = new LocalStrategy(localOptions, async function (loginName, password, done) {
  try {
    const findUser = await UserHelper.checkUserByCredentials(loginName);
    console.log(findUser.user);
    if (findUser.err) {
      return done(null, false);
    }
    if (!findUser.user) {
      return done(null, false);
    }
    const passwordMatch = bcrypt.compareSync(password, findUser.user.password);
    if (!passwordMatch) {
      return done(null, false);
    }
    return done(null, findUser.user);
  }
  catch (e) {
    return done(e);
  }
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: Config.SESSION_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, async function (payload, done) {
  try {
    console.log(payload);
    // const findUser = await UserHelper.findUserById(payload.sub);
    // console.log('findUser', findUser);
    // if (findUser.err) { 
    //   return done(null, false);
    // }
    // done(null, findUser.user);

    const user = await User.findOne({ _id: payload.sub })
      .populate({
        path: '_host',
        select: { _id: 1, hostName: 1, isSpecific: 1, language: true, geoLocation: true, long: true, lat: true },
        populate: {
          path: '_activeDesign',
          populate: {
            path: '_profilePic',
            select: { _id: true, secure_url: true }
          }
        }
      })
      // .populate({
      //   path: '_activeTeam',
      //   populate: [{path: 'teamMembers'}, {path: 'teamLeaders'}]
      // })
      .populate('_activeTeam')
      .populate('_role')
      .populate('_profilePic')
      .populate({
        path: 'teamMembers',
        populate: {
          path: '_team'
        }
      })
      .populate({
        path: 'teamLeaders',
        populate: {
          path: '_team'
        }
      });

      console.log('user', user);

      done(null, user);
  }
  catch (e) {
    return done(e, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);
