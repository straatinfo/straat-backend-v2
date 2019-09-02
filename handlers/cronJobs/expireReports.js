const moment = require('moment');

function createQuery (req, res, next) {
  const query = {
    $and: [
      {
        status: {
          $in: ['INPROGRESS', 'NEW']
        }
      },
      {
        updatedAt: {
          $lte: moment().subtract(5, 'd')
        }
      }
    ]
  };


  req.$scope.reportQuery = query;
  next();
}

function logic (req, res, next) {
  const query = req.$scope.reportQuery;
  return req.db.Report.updateMany(query, { 
    status: 'EXPIRED',
    updatedAt: Date.now()
  })
    .then((reports) => {
      res.status(200).send({
        status: 'SUCCESS',
        httpCode: 200,
        statusCode: 0,
        statusMessage: 'Successfully expired the reports'
      });
    })
    .catch((e) => {
      console.log('ERROR in expiring reports', e);
      res.status(500).send({
        status: 'ERROR',
        httpCode: 500,
        statusCode: 100,
        statusMessage: 'Internal server error'
      });
    });
}

module.exports = {
  createQuery,
  logic
};
