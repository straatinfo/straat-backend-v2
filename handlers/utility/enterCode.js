const _ = require('lodash');

function enterCode (req, res, next) {
  const validCodes = process.env.UNIQUE_CODES || 'SeTT0';

  const codeList = validCodes.split('|');

  const { code } = req.body;

  if (!code) {
    return res.status(400).send({
      status: 'ERROR',
      statusCode: 102,
      httpCode: 400,
      statusMessage: 'Missing Parameter: Code'
    });
  }

  const valid = _.find(codeList, (c) => c == code);

  if (!valid) {
    return res.status(400).send({
      status: 'ERROR',
      statusCode: 102,
      httpCode: 400,
      statusMessage: 'Invalid Parameter: Code'
    });
  } else {
    return res.status(201).send({
      status: 'SUCCESS',
      statusCode: 0,
      httpCode: 201
    });
  }

}

module.exports = enterCode;
