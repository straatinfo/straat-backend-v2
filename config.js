module.exports = {
  // DATA_BASE: 'mongodb://heroku_3mjfnk1l:iqi60fhdgbgab2ffmf3vovlff5@ds121268.mlab.com:21268/heroku_3mjfnk1l',
  DATA_BASE: process.env.MONGODB_URI || 'mongodb://localhost:27017/straat',
  SESSION_SECRET: process.env.SESSION_SECRET || 'mysupersecretkey',
  CLOUDINARY: {
    cloud_name: 'hvina6sjo',
    api_key: '485521389972512',
    api_secret: 'QOaJKE9sXc1qe4GHFYjNSFkFT68',
    url : 'cloudinary://485521389972512:QOaJKE9sXc1qe4GHFYjNSFkFT68@hvina6sjo'
  },
  SENDGRID: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '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',
    SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD || 'pp5ohrek8906',
    SENDGRID_USERNAME: process.env.SENDGRID_USERNAME || 'app86892324@heroku.com'
  },
  EMAIL_ADDRESSES: {
    STRAAT_INFO_EMAIL: process.env.STRAAT_INFO_EMAIL || 'jaylord@globalbrainforce.com',
    NO_REPLY: 'no-reply@straat.info',
    SEQRETARY_EMAIL: process.env.SEQRETARY_EMAIL || 'jaylord@globalbrainforce.com', // 'seqretary@gmail.com'
    DELETED_TEAM_EMAIL: process.env.DELETED_TEAM_EMAIL || 'jaylord@globalbrainforce.com', // 'deletedteaam@straat.info'
    NEW_TEAM_REQUEST: process.env.NEW_TEAM_REQUEST || 'jaylord@globalbrainforce.com' // 'jaylord@globalbrainforce.com'
  }
};
