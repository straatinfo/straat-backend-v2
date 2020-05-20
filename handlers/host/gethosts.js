const internals = {};
internals.catchError = async function (err, req, res) {
  req.log.error(err, 'POST /v4/api/hosts');

  return res.status(500).send({
    status: 'ERROR',
    statusCode: 100,
    httpCode: 500,
    message: 'Internal Server Error'
  });
};

async function buildQuery (req, res, next) {
  try {
    const { 
      limit,
      page,
      softRemoved,
      role,
      sort,
      criteria = 'ascending'
    } = req.query;
  
    const query = {};
  
    let allowedLimit = 100;
    let offset = 0;
    let order = '-createdAt';
  
    if (limit) {
      allowedLimit = Number(limit) < 301 ? Number(limit) : 300;
      req.query.limit = allowedLimit;
    }
  
    if (page) {
      offset = allowedLimit * page;
    }
  
    if (sort) {
      order = criteria == 'ascending' ? `+${sort}` : `-${sort}`
    }
  
    if (softRemoved != null) {
      query.softRemoved = softRemoved;
    }
  
    const hosts = await req.db.Host
      .find(query, ['_id'])
      .skip(offset)
      .limit(allowedLimit)
      .sort(order);
  
    const count = await req.db.Host.countDocuments(query);
    req.$scope.hosts = hosts.map(host => host._id);
    req.$scope.count = count;
  
    next();
  } catch (err) {
    internals.catchError(err, req, res);
  }
}

function respond (req, res, next) {
  const { 
    limit,
    page,
    softRemoved,
    role,
    sort,
    criteria = 'ascending'
  } = req.query;

  res.status(200).send({
    status: 'SUCCESS',
    statusCode: 0,
    httpCode: 200,
    page: Number(page) || 0,
    limit: Number(limit) || 0,
    count: req.$scope.count,
    hosts: req.$scope.hosts
  })
}

module.exports = {
  buildQuery,
  respond
};
