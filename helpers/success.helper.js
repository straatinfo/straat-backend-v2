const success = (res, data, message= null) => {
  const object = {
    status: 1,
    message: message,
    data: data
  };
  console.log('Success: ', (message) ? message : 'Successfully sent request');
  return res.status(200).send(object);
}

module.exports = {
  success: success
};
