const bcrypt = require('bcrypt-nodejs');
const backup = require('mongodb-backup');
const multer = require('multer');
let cloudinary = require('cloudinary');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const highland = require('highland');
const backupPath = path.join(__dirname, '../tmp/db');
const CONFIG = require('../config');
const MailHelper = require('../helpers/mailing.helper');

const DB_PATH = CONFIG.DATA_BASE;

cloudinary.config({
  ...CONFIG.CLOUDINARY
});

function checkToken (req, res, next) {
  req.$scope = {};
  const isAuthenticated = bcrypt.compareSync('server-password-123456789', req.headers.token);
  if (isAuthenticated) {
    delete req.headers['token'];
    return next();
  } else {
    return res.status(400).json({
      'status': 'ERROR',
      'statusCode': 400,
      'error': 'UnAuthorized Request'
    });
  }
}

function backupDB (req, res, next) {
  backup({
    uri: DB_PATH, // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
    root: backupPath,
    tar: 'dump.tar',
    callback: function (err) {
      if (err) {
        return res.status(500).json({
          'status': 'ERROR',
          'statusCode': 500,
          'error': 'Internal Server Error',
          'message': err
        });
      }
      return next();
    }
  });
}

function uploadDBDump (req, res, next) { 
 
  cloudinary.v2.uploader.upload(path.join(__dirname, '../tmp/db/dump.tar'), 
    {public_id: 'dump-db' + '-' + moment().format('YYYY-MM-DD:HH:MM'), resource_type: 'raw'},
    function(error, result) {
      if (error) {
        return res.status(500)
          .json({
            'status': 'ERROR',
            'statusCode': 500,
            'error': 'Internal Server Error',
            'message': error
          });
      }
      req.$scope.metadata = result;
      return next();
    });
}

function sendEmail (req, res, next) {
  console.log('Backup Successful', req.$scope.metadata);
  return MailHelper.databaseBackup('johnhiggins.avila@gmail.com', req.$scope.metadata.secure_url, moment().format('YYYY-MM-DD HH:MM:SS'))
  .then(function (result) {
    return next();
  })
  .catch(function (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json(err);
    }
    return res.status(500).json(err);
  });
}

function respond (req, res, next) {
  return res.status(200).json({'message': 'success'});
}

module.exports = {
  checkToken,
  backupDB,
  uploadDBDump,
  sendEmail,
  respond
};
