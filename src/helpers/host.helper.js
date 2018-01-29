const db = require('../models');
const Op = require('sequelize').Op;

const getHost = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const hosts = await db.user.findAll({
        where: {roleId: 2},
        attributes: [
          'id', 'institutionName', 'fname', 'lname', 'gender',
          'email', 'username', 'address', 'postalCode', 'city',
          'nickName', 'roleId', 'long', 'lat'
        ],
        include: [
          { model: db.role }
        ]
      });
      resolve({err: null, hosts: hosts});
    }
    catch (e) {
      reject(e);
    }
  });
}

const getHostPerPage = (itemPerPage, pageNumber) => {
  return new Promise(async(resolve, reject) => {
    try {
      let items, offset;
      // limit the number of items to 20
      if (itemPerPage > 20) {
        items = 20;
      } else {
        items = itemPerPage;
      }
      offset = items * pageNumber;
      const hosts = await db.user.findAll({
        where: {roleId: 2},
        order: [
          ['instituteName', 'ASC']
        ],
        limit: items,
        offset: offset,
        attributes: [
          'id', 'institutionName', 'fname', 'lname', 'gender',
          'email', 'username', 'address', 'postalCode', 'city',
          'nickName', 'roleId', 'long', 'lat'
        ],
        include: [
          { model: db.role }
        ]
      });
      resolve({err: null, hosts: hosts});
    }
    catch (e) {

    }
  });
}

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
          'nickName', 'roleId', 'long', 'lat'
        ],
        include: [
          { model: db.role }
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
          'nickName', 'roleId', 'long', 'lat'
        ],
        include: [
          { model: db.role }
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
  getHostById: getHostById,
  getHost: getHost,
  getHostPerPage: getHostPerPage
};
