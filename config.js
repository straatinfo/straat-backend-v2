module.exports = {
  DATA_BASE: process.env.DATA_BASE || 'mongodb://localhost:27017/straat',
  SESSION_SECRET: process.env.SESSION_SECRET || 'mysupersecretkey',
  CLOUDINARY: {
    cloud_name: 'hvina6sjo',
    api_key: '485521389972512',
    api_secret: 'QOaJKE9sXc1qe4GHFYjNSFkFT68',
    url : 'cloudinary://485521389972512:QOaJKE9sXc1qe4GHFYjNSFkFT68@hvina6sjo'
  },
};
