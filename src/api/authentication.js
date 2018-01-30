const db = require('../models');
const jwtService = require('../services/jwt.service');
const Op = require('sequelize').Op;
const _ = require('lodash');
const UserHelper = require('../helpers/user.helper');
const ErrorHelper = require('../helpers/error.helper');

const checkUserInput = async (req, res, next) => {
  const { input } = req.params;
  try {
    const checkInput = await UserHelper.checkUserByInput(input);
    if (checkInput.err) {
      ErrorHelper.clientError(res, 400, checkInput.err);
      return;
    }
    res.status(200).send({message: 'Good'});
  }
  catch (e) {
    ErrorHelper.serverError(e);
  }
};

/* login API */
const login = async (req, res, next) => {
  try {
    if (!req.user.id) {
      ErrorHelper.clientError(res, 400, 'Unauthorized');
      return;
    }
    const user = await UserHelper.getUserInfo(req.user.id);
    // give user token
    res.status(200).send({user: user.user, token: jwtService.tokenForUser(req.user)});
  }
  catch (e) {
    ErrorHelper.serverError(res);
  }
};

/* register API */
const register = async (req, res, next) => {
  const {
    hostName, fname, lname, gender, email,
    username, postalCode, houseNumber, streetName, city,
    state, zip, country, phoneNumber, nickName,
    roleId, password, confirmedPassword, long, lat
  } = req.body;

  try {
    // check for require fields
    if (!email || !address || !password || !confirmedPassword) {
      ErrorHelper.clientError(res, 400, 'Please Complete the fields');
      return;
    }
    // check passwords
    if (!password || !confirmedPassword || password !== confirmedPassword) {
      ErrorHelper.clientError(res, 400, 'Passwords Do not match');
      return;
    }
    // set roleId
    const getRoleId = (roleId === 2) ? 2 : 3;
    // check if user exists
    const checkUser = await UserHelper.checkUserExistence(email, username);
    if (checkUser.user) {
      ErrorHelper.clientError(res, 400, 'Username or Email Already exists.');
      return;
    }
    // register user
    const newUser = await UserHelper.createUser(
      hostName, fname, lname, gender, email,
      username, postalCode, houseNumber, streetName, city,
      state, zip, country, phoneNumber, nickName,
      roleId, password, confirmedPassword, long, lat
    );
    if (newUser.err) {
      ErrorHelper.clientError(res, 400, newUser.err);
      return;
    }

    const user = await UserHelper.getUserInfo(newUser.user.id);
    if (user.err) {
      ErrorHelper.clientError(res, 400, 'User was not registered.');
      return;
    }
    // Give a user token
    res.status(200).send({ user:user.user, token: jwtService.tokenForUser(user.user) });
  }
  catch (e) {
    console.log(e);
    ErrorHelper.serverError(res);
  }
}

module.exports = {
  login: login,
  register: register,
  checkUserInput: checkUserInput
};
