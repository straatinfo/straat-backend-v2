const ServerError = (res) => {
  const object = {
    status: 0,
    message: 'Server Error'
  };
  console.log('Error: ', object);
  return res.status(500).send(object);
};

const ClientError = (res, data, status = 400) => {
  const object = {
    status: 0,
    message: 'Client Error',
    data: data
  };
  console.log('Error: ', object);
  return res.status(status).send(object);
};

const UserError = (res, data, status = 200) => {
  const object = {
    status: 0,
    message: 'User Error',
    data: data
  };
  console.log('Error: ', object);
  return res.status(status).send(object);
}

module.exports = {
  ServerError: ServerError,
  ClientError: ClientError,
  UserError: UserError
};
