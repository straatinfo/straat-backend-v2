function appendHostToAddress (req, res, next) {
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

  return req.db.Host.findOne({
    $and: [
      { _role: role._id },
      { hostName: addressObject.municipality.label }
    ]
  })
    .then((host) => {
      if (!host) {
        return res.status(400).send({
          status: 'ERROR',
          statusCode: 102,
          httpCode: 400,
          message: 'Municipality is not registered'
        });
      }

      req.$scope.address._host = host;
      const data = req.$scope.address
      res.status(200).send(data);
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

module.exports = appendHostToAddress;
