const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const Config = require('../config');
cloudinary.config({
  ...Config.CLOUDINARY
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'sample',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    const filename = file.originalname +'_'+ new Date();
    cb(undefined, filename);
  }
});

const singleUpload = (fieldName) => {
  const upload = multer({ storage: storage });
<<<<<<< HEAD
  return upload.singleUpload(fieldName);
=======
  return upload.single(fieldName);
>>>>>>> 128f8c64d6e5a41adbb3204c31daf429df67a486
};

const multipleUpload = (fieldName, numberOfFiles) => {
  const upload = multer({ storage: storage });
  return upload.array(fieldName, numberOfFiles);
};

const getMetaData = (req, res, next) => {
  if (req.files.length === 0) {
    return next();
  }
  try {
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
  catch (e) {
    res.status(500).send({status: 0, error: 'Server Error'});
  }
};

module.exports = {
  singleUpload: singleUpload,
  multipleUpload: multipleUpload,
  getMetaData: getMetaData
};
