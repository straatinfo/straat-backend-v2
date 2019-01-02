const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const Config = require('../config');
cloudinary.config({
  ...Config.CLOUDINARY
});

const storage = (folderName, allowedFormats = ['jpg', 'png']) => {
  return cloudinaryStorage({
    cloudinary: cloudinary,
    folder: folderName,
    allowedFormats: allowedFormats,
    filename: function (req, file, cb) {
      const filename = file.originalname +'_'+ new Date();
      cb(undefined, filename);
    }
  })
};

const singleUpload = (fieldName, folderName = 'sample', allowedFormats = ['jpg', 'png']) => {
  const upload = multer({ storage: storage(folderName, allowedFormats) });
  return upload.single(fieldName);
};

const multipleUpload = (fieldName, numberOfFiles, folderName = 'sample', allowedFormats = ['jpg', 'png'] ) => {
  const upload = multer({ storage: storage(folderName, allowedFormats) });
  return upload.array(fieldName, numberOfFiles);
};

const getMetaData = (req, res, next) => {
  try {
    if (!req.files) {
      return next();
    }
    if (req.files.length === 0) {
      return next();
    }
    if (req.files && req.files.length !== 0) {
      const dataArray = req.files.map((f) => {
        return {
          public_id: f.public_id,
          mimetype: f.mimetype,
          url: f.url,
          secure_url: f.secure_url,
          format: f.format,
          etag: f.etag,
          width: f.width,
          height: f.height
        };
      });
      req.dataArray = dataArray;
      next();
    }
  }
  catch (e) {
    res.status(500).send({status: 0, error: 'Server Error'});
  }
};

module.exports = {
  singleUpload: singleUpload,
  multipleUpload: multipleUpload,
  getMetaData: getMetaData
};
