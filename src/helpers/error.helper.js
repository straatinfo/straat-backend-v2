const clientError = (res, statusCode, message) => {
  return res.status(statusCode).send(`Client Error: ${message}`);
};

const serverError = (res) => {
  return res.status(500).send('Internal Server Error.');
};

module.exports = {
  clientError: clientError,
  serverError: serverError
};
