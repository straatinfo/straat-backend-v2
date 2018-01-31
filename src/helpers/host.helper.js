const db = require('../models');
const Op = require('sequelize').Op;

const getHost = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const hosts = await db.user.findAll({
        where: {roleId: 2},
        attributes: [
          'id', 'hostName', 'phoneNumber',
          'email', 'username', 'postalCode', 
          'houseNumber', 'streetName', 'city','state', 'zip',
          'country','long', 'lat', 'nickName', 'roleId', 'isBlocked'
        ],
        order: [
          ['hostName', 'ASC']
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
          'id', 'hostName', 'phoneNumber',
          'email', 'username', 'postalCode', 
          'houseNumber', 'streetName', 'city','state', 'zip',
          'country','long', 'lat', 'nickName', 'roleId', 'isBlocked'
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
          'id', 'hostName', 'phoneNumber',
          'email', 'username', 'postalCode', 
          'houseNumber', 'streetName', 'city','state', 'zip',
          'country','long', 'lat', 'nickName', 'roleId', 'isBlocked'
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
          'id', 'hostName', 'phoneNumber',
          'email', 'username', 'postalCode', 
          'houseNumber', 'streetName', 'city','state', 'zip',
          'country','long', 'lat', 'nickName', 'roleId', 'isBlocked'
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

const updateHost = (
  id, hostName, email, username, postalCode,
  houseNumber, streetName, city, state,
  zip, country, phoneNumber, nickName, long, lat, isBlocked
) => {
  return new Promise(async(resolve, reject) => {
    try {
      let blocked;
      if (!isBlocked) {
        blocked = false;
      } else {
        blocked = true;
      }
      const updatedHost = await db.user.update({
        id, hostName, email, username, postalCode,
        houseNumber, streetName, city, state,
        zip, country, phoneNumber, nickName, long, lat, isBlocked: blocked
      }, {where: {id}, returning: true });
      if (!updatedHost[1][0]) {
        resolve({err: `Host ID: ${id} was not updated`});
        return;
      }
      const host = await db.user.findOne({
        where: {id: updatedHost[1][0].id},
        attributes: [
          'id', 'hostName', 'phoneNumber',
          'email', 'username', 'postalCode', 
          'houseNumber', 'streetName', 'city','state', 'zip',
          'country','long', 'lat', 'nickName', 'roleId', 'isBlocked'
        ],
        include: [
          { model: db.role }
        ]
      });
      resolve({err: null, host: host});
    }
    catch (e) {
      reject(e);
    }
  });
};

const deleteHost = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const deleteH = await db.user.destroy({where: {id}});
      if (deleteH === 0) {
        resolve({err: `Host ID: ${id} does not exist`});
        return;
      }
      resolve({err: null, affectedRows: deleteH});
    }
    catch (e) {
      reject(e);
    }
  });
};

const createHost = (
  hostName, email, username, postalCode,
  houseNumber, streetName, city, state,
  zip, country, phoneNumber, nickName, long, lat
) => {
  return new Promise(async(resolve, reject) => {
    try {
      if (!hostName || !email || !username) {
        resolve({err: 'Incomplete Input'});
        return;
      }
      const checkH = await db.user.findAll({
        where: {
          [Op.or]: [
            {hostName},
            {email},
            {username}
          ]
        }
      });
      if (checkH.length !== 0) {
        resolve({err: 'A host is already using the email, username or hostName'});
        return;
      }
      const createH = await db.user.create({
        hostName, email,
        username, postalCode, houseNumber, streetName, city,
        state, zip, country, phoneNumber, nickName,
        roleId: 2, long, lat
      });
      if (!createH) {
        resolve({err: 'Unable to create new Host'});
        return;
      }
      const host = await db.user.findOne({
        where: {id: createH.id},
        attributes: [
          'id', 'hostName', 'phoneNumber',
          'email', 'username', 'postalCode', 
          'houseNumber', 'streetName', 'city','state', 'zip',
          'country','long', 'lat', 'nickName', 'roleId', 'isBlocked'
        ],
        include: [
          { model: db.role }
        ]
      });
      resolve({err: null, host: host});
    }
    catch (e) {
      reject(e);
    }
  });
};

const createHostLoop = (dataArray = [], promiseFunction = createHost) => {
  return new Promise(async (resolve, reject) => {
    let err = [], success = [];
    try {
      const create = await Promise.all(dataArray.map(async (d) => {
        try {
          const {
            hostName, email, username, postalCode,
            houseNumber, streetName, city, state,
            zip, country, phoneNumber, nickName, long, lat
          } = d;
          const newCreate = await promiseFunction(
            hostName, email, username, postalCode,
            houseNumber, streetName, city, state,
            zip, country, phoneNumber, nickName, long, lat, 'isBlocked'
          );
          if (newCreate.err) {
            err.push(newCreate.err);
            return;
          }
          success.push(newCreate.host);
        }
        catch (e) {
          err.push(e);
        }
      }));
      resolve({err: err, success: success});
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
  getHostPerPage: getHostPerPage,
  updateHost: updateHost,
  deleteHost: deleteHost,
  createHost: createHost,
  createHostLoop: createHostLoop
};
