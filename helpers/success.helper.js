const success = (res, data, message='Success') => {
  const object = {
    status: 1,
    message: message,
    data: data
  };
  return res.status(200).send(object);
}

module.exports = {
  success: success
};
