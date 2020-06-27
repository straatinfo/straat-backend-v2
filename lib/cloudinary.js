const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const config = require('../config');
cloudinary.config({
  ...config.cloudinary
});

function storage (folderName, allowedFormats = ['jpg', 'png']) {
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

module.exports = {
  singleUpload
};
