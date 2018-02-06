exports.testFunction = (req, res, next) => {
  console.log(req.files);
  console.log(req.body);
  res.end();
};