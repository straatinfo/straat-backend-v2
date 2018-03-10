const MediaUpload = require('../models/MediaUpload');

const createMediaUpload = ({public_id, mimetype, url, secure_url, format, etag, width, height}) => {
  return new Promise((resolve, reject) => {
    const mediaInput = {public_id, mimetype, url, secure_url, format, etag, width, height};
    const newMedia = new MediaUpload(mediaInput);
    newMedia.save((err, mediaUpload) => {
      if (err) {
        return resolve({err: err});
      }
      if (!mediaUpload) {
        return resolve({err: 'Could not create media upload at this time'});
      }
      resolve({err: null, mediaUpload: mediaUpload});
    });
  });
};

module.exports = {
  createMediaUpload: createMediaUpload
};
