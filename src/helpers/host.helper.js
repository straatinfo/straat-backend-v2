const db = require('../models');
const Op = require('sequelize').Op;

const getHostWithinRadius = (long, lat, radius) => {
  return new Promise(async(resolve, reject) => {
    try {
      const longOffsetMax = parseFloat(long) + parseFloat(radius);
      const longOffsetMin = parseFloat(long) - parseFloat(radius);
      const latOffsetMax = parseFloat(lat) + parseFloat(radius);
      const latOffsetMin = parseFloat(lat) - parseFloat(radius);
      const hosts = await db.user.findAll({
        where: {
          [Op.and]: [
            {roleId: 2},
            {
              [Op.or]: [
                {
                  [Op.and]: [
                    { long: { [Op.gt]: longOffsetMin } },
                    { long: { [Op.lt]: longOffsetMax } }
                  ]
                },
                {
                  [Op.and]: [
                    { lat: { [Op.gt]: latOffsetMin } },
                    { lat: { [Op.lt]: latOffsetMax } }
                  ]
                }
              ]
            }
          ]
        },
        attributes: [
          'id', 'institutionName', 'fname', 'lname', 'gender',
          'email', 'username', 'address', 'postalCode', 'city',
          'nickName', 'roleId'
        ],
        include: [
          { model: db.role },
          { model: db.userLeader, include: [{ model: db.team }] },
          { model: db.userMemeber, include: [{ model: db.team }] }
        ]
      });
      resolve({err: null, hosts: hosts});
    }
    catch (e) {
      reject(e);
    }
  });
};

const getHostById = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const host = await db.user.findOne({
        where: {id},
        attributes: [
          'id', 'institutionName', 'fname', 'lname', 'gender',
          'email', 'username', 'address', 'postalCode', 'city',
          'nickName', 'roleId'
        ],
        include: [
          { model: db.role },
          { model: db.userLeader, include: [{ model: db.team }] },
          { model: db.userMemeber, include: [{ model: db.team }] }
        ]
      });
      if (!host) {
        resolve({err: `Host ID: ${id} does not exist`});
        return;
      }
      resolve({err: null, host: host});
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getHostWithinRadius: getHostWithinRadius,
  getHostById: getHostById
};
