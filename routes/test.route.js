const Test = require('../api/test');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const multer = require('multer');
const express = require('express');
const TestRoute = express.Router();

cloudinary.url = 'cloudinary://485521389972512:QOaJKE9sXc1qe4GHFYjNSFkFT68@hvina6sjo';
cloudinary.config({
  cloud_name: 'hvina6sjo',
  api_key: '485521389972512',
  api_secret: 'QOaJKE9sXc1qe4GHFYjNSFkFT68'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'sample',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    console.log(file);
    const filename = file.originalname +'_'+ new Date();
    cb(undefined, filename);
  }
});

const parser = multer({ storage: storage });

TestRoute.route('/')
.post(parser.array('images', 10), Test.testFunction);

module.exports = TestRoute;
