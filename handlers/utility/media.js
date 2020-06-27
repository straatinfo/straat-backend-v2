async function uploadPhotoAndSave (req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).send({
        status: 'ERROR',
        statusCode: 101,
        httpCode: 400,
        statusMessage: 'File not found'
      });
    }

    const response = await req.db.MediaUpload.create(req.file);
    res.status(200).send({
      status: 'SUCCESS',
      statusCode: 0,
      httpCode: 200,
      id: response._id
    });
  }

  catch (e) {
    req.log.error(e, 'Upload Photo And Save');
    res.status(500).send({
      status: 'ERROR',
      statusCode: 101,
      httpCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
};

module.exports = {
  save: uploadPhotoAndSave
};
