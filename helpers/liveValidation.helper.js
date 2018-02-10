
const validateEmail = (email) => {
  return new Promise((resolve, reject) => {


    // here magic happen
    Message.find({'_conversation': _conversation})
    .limit(20)
    .sort({'createdAt': -1})
    .exec((err, messages) => {
      if (err) {
        return resolve({err: err});
      }
      resolve({err: null, messages: messages});
    });
  });
}


module.exports = {
  validateEmail
}
