module.exports =  (req, res, next) => {
  const userId = req.params.userId || req.query.userId || req.body.userId;

  if (!userId) {
    return res.status(400).send({
      status: 'ERROR',
      statusCode: 101,
      httpCode: 400,
      statusMessage: 'Missing Parameter: User Id'
    });
  }

  return req.db.User.findByIdAndRemove(userId)
    .then(() => next())
    .catch(err => {
      console.log(err);
      res.status(400).send({
        status: 'ERROR',
        statusCode: 101,
        httpCode: 400,
        statusMessage: 'Invalid Parameter: User Id'
      });
    });
}
