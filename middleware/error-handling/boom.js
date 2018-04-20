
module.exports = function (err, req, res, next) {
  if (err.isBoom) {
    // return res.status(err.output.statusCode).json(err.output.payload);
    err.error = err.output.payload.error;
    err.statusCode = err.output.payload.statusCode;
    err.message = err.output.payload.message;
    res.status(err.statusCode).send({...err.output.payload, status: 0});
  }
  next();
};
