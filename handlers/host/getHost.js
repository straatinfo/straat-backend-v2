'use strict';

const _ = require('lodash');

function getHostByName (req, res, next) {
  const roleId = req.$scope.role && req.$scope.role._id;
  const hostName = req.params.hostName || req.query.hostName || req.body.hostName;

  return req.db.User.findOne({
    $and: [
      { _role: roleId },
      {
        hostName: {
          $regex: new RegExp(hostName, 'ig')
        }
      }
    ]
  })
    .then((host) => {
      req.$scope.host = host
      next();
    })
    .catch((err) => {
      console.log(err);

      res.status(500).send({
        status: 'ERROR',
        statusCode: 100,
        httpCode: 500,
        message: 'Internal server error'
      });
    });
}

function getHostByCoordinates (req, res, next) {
  let error;
  const roleId = req.$scope.role && req.$scope.role._id;
  const radius = req.params.radius || req.query.radius || req.body.radius || req.$scope.radius || 5000;
  const long = req.params.long || req.query.long || req.body.long || req.$scope.long;
  const lat = req.params.lat || req.query.lat || req.body.lat || req.$scope.lat;
  if (!radius) {
    error = {
      status: 'ERROR',
      statusCode: 101,
      httpCode: 400,
      message: 'Missing Parameter: Radius'
    };
  }

  if (!long) {
    error = {
      status: 'ERROR',
      statusCode: 101,
      httpCode: 400,
      message: 'Missing Parameter: Longitude'
    };
  }

  if (!lat) {
    error = {
      status: 'ERROR',
      statusCode: 101,
      httpCode: 400,
      message: 'Missing Parameter: Latitude'
    };
  }

  if (error) {
    return res.status(error.httpCode).send(error);
  }

  return req.db.User.find({
    $and: [
      { _role: roleId },
      {
        geoLocation: {
          $near: {
            $maxDistance: parseFloat(radius),
            $minDistance: 0,
            $geometry: {
              type: 'Point',
              coordinates: [ parseFloat(long), parseFloat(lat) ]
            },
            distanceField: 'distance'
          }
        }
      }
    ]
  })
    .then((hosts) => {
      if (hosts.length < 1) {
        return next();
      }
      const sortedHost = _.sortBy(hosts, (h) => h.distance);
      req.$scope.host = sortedHost[0];

      next();
    })
    .catch((err) => {
      console.log(err);

      res.status(500).send({
        status: 'ERROR',
        statusCode: 100,
        httpCode: 500,
        message: 'Internal server error'
      });
    });
}

function getHostUsingAddress (req, res, next) {
  const address = req.$scope.address;
  const role = req.$scope.role;

  const addressObject = address._embedded && address._embedded.addresses && address._embedded.addresses[0]
  if (!addressObject) {
    return res.status(400).send({
      status: 'ERROR',
      statusCode: 102,
      httpCode: 400,
      message: 'Invalid Postcode'
    });
  }

  return req.db.User.findOne({
    $and: [
      { _role: roleId },
      { hostName: addressObject.municipality.label }
    ]
  })
    .populate('_activeDesign')
    .then((host) => {
      if (host) {
        req.$scope.host = host;
        return next();
      }
      const radius = 5000;
      const lat
      = addressObject.geo
      && addressObject.geo.center
      && addressObject.geo.center.wgs84
      && addressObject.geo.center.wgs84.coordinates
      && addressObject.geo.center.wgs84.coordinates[0] || 0;
      const long
      = addressObject.geo
      && addressObject.geo.center
      && addressObject.geo.center.wgs84
      && addressObject.geo.center.wgs84.coordinates
      && addressObject.geo.center.wgs84.coordinates[1] || 0;
      return req.db.User.find({
        $and: [
          { _role: roleId },
          {
            geoLocation: {
              $near: {
                $maxDistance: parseFloat(radius),
                $minDistance: 0,
                $geometry: {
                  type: 'Point',
                  coordinates: [ parseFloat(long), parseFloat(lat) ]
                },
                distanceField: 'distance'
              }
            }
          }
        ]
      })
    })
    .then((hosts) => {
      if (hosts.length < 1) {
        return next();
      }
      const sortedHost = _.sortBy(hosts, (h) => h.distance);
      req.$scope.host = sortedHost[0];

      next();
    })
    .catch((err) => {
      console.log(err);

      res.status(500).send({
        status: 'ERROR',
        statusCode: 100,
        httpCode: 500,
        message: 'Internal server error'
      });
    });
}

function response (req, res, next) {
  const host = req.$scope.host;
  if (!host) {
    return next();
  }
  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    host: host,
    data: host
  });
}

function catchMiddlewareError (req, res, next) {
  res.status(400).send({
    status: 'ERROR',
    statusCode: 102,
    httpCode: 400,
    message: 'Cant find host'
  });
}

module.exports = {
  getHostByName,
  getHostByCoordinates,
  getHostUsingAddress,
  response,
  catchMiddlewareError
};
