const db = require('../models');
const Op = require('sequelize').Op;

const checkUserExistence = (email, username) => {
  return new Promise (async(resolve, reject) => {
    try {
      const checkUser = await db.user.findOne({
        where: {
          [Op.or]: [{email}, {username}]
        }
      });
      if (!checkUser) {
        resolve({err: 'User Does not exist'});
      }
      resolve({err: null, user: checkUser});
    } 
    catch (e) {
      reject(e);
    }
  });
};

const createUser = (
  hostName, fname, lname, gender, email,
  username, postalCode, houseNumber, streetName, city,
  state, zip, country, phoneNumber, nickName,
  roleId, password, confirmedPassword, lat, long
) => {
  return new Promise(async(resolve, reject) => {
    try {
      const newUser = await db.user.create({
        hostName, fname, lname, gender, email,
        username, postalCode, houseNumber, streetName, city,
        state, zip, country, phoneNumber, nickName,
        roleId, password, confirmedPassword, lat, long
      });
      if (!newUser) {
        resolve({err: 'Invalid Input'});
        return;
      }
      resolve({err: null, user: newUser});
    }
    catch (e) {
      reject(e);
    }
  });
};

const getUserInfo = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const user = await db.user.findOne({
        attributes: [
          'id', 'hostName', 'fname', 'lname', 'gender',
          'email', 'username', 'postalCode', 
          'houseNumber', 'streetName', 'city','state', 'zip',
          'country','lat', 'long', 'nickName', 'roleId'
        ],
        where: {id},
        include: [
          { model: db.role }
        ]
      });
      if (!user) {
        resolve({err: 'User does not exist'});
        return;
      }
      resolve({err: null, user: user});
    }
    catch(e) {
      reject(e);
    }
  });
};

module.exports = {
  checkUserExistence: checkUserExistence,
  createUser: createUser,
  getUserInfo: getUserInfo
};
