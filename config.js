module.exports = {
  DATA_BASE: process.env.MONGODB_URI || 'mongodb://heroku_3mjfnk1l:iqi60fhdgbgab2ffmf3vovlff5@ds121268.mlab.com:21268/heroku_3mjfnk1l',
  SESSION_SECRET: process.env.SESSION_SECRET || 'mysupersecretkey',
  CLOUDINARY: {
    cloud_name: 'hvina6sjo',
    api_key: '485521389972512',
    api_secret: 'QOaJKE9sXc1qe4GHFYjNSFkFT68',
    url: 'cloudinary://485521389972512:QOaJKE9sXc1qe4GHFYjNSFkFT68@hvina6sjo'
  },
  SENDGRID: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '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',
    SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD || 'pp5ohrek8906',
    SENDGRID_USERNAME: process.env.SENDGRID_USERNAME || 'app86892324@heroku.com'
  },
  EMAIL_ADDRESSES: {
    STRAAT_INFO_EMAIL: process.env.STRAAT_INFO_EMAIL || 'johnhiggins.avila@gmail.com',
    NO_REPLY: 'no-reply@straat.info',
    NEW_TEAM_REQUEST: process.env.NEW_TEAM_REQUEST || 'jaylord@globalbrainforce.com', // 'jaylord@globalbrainforce.com'
    UPDATE_REQUEST_EMAIL: process.env.UPDATE_REQUEST_EMAIL || 'updaterequest@straat.info',
    SEQRETARY_EMAIL: process.env.SEQRETARY_EMAIL || 'johnhiggins.avila@gmail.com', // 'seqretary@gmail.com'
    DELETED_TEAM_EMAIL: process.env.DELETED_TEAM_EMAIL || 'deletedEmailTema@info.com', // 'deletedteaam@straat.info'
    FEED_BACK_EMAIL: process.env.FEED_BACK_EMAIL || 'feedback@straat.info'
  },
  GOOGLE: {
    // used in app
    apiKey: 'AIzaSyCYDM_gyqp1UGVClhh05ek_4G0zr4n55xA'
  }
};
