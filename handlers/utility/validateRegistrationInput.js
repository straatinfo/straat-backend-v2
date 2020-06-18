async function validateRegistrationInput (req, res, next) {
  const {
    username,
    email,
    teamName,
    phoneNumber } = req.body
  
  let error = {
    status: 'ERROR',
    statusCode: 102,
    httpCode: 400
  };

  let hasError = false;

  if (username) {
    const user = await req.db.User.findOne({ username });
    if (user) {
      hasError = true;
      error.statusMessage = 'Invalid Parameter: Username is already in use';
    }
  }

  if (email && !hasError) {
    const user = await req.db.User.findOne({ email });
    if (user) {
      hasError = true;
      error.statusMessage = 'Invalid Parameter: Email is already in use';
    }
  }

  if (teamName && !hasError) {
    const team = await req.db.Team.findOne({ teamName });
    if (team) {
      hasError = true;
      error.statusMessage = 'Invalid Parameter: Team name is already in use';
    }
  }

  if (phoneNumber && !hasError) {
    const user = await req.db.User.findOne({ phoneNumber });
    if (user) {
      hasError = true;
      error.statusMessage = 'Invalid Parameter: Phonenumber is already in use';
    }
  }


  if (!hasError) {
    return res.status(201).send({
      status: 'SUCCESS',
      statusCode: 0,
      httpCode: 201
    });
  }

  req.log.warn(error, 'Validate user Input Error');

  return res.status(400)
    .send(error);
}

module.exports = validateRegistrationInput;
