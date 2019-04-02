module.exports = {
  DATA_BASE: process.env.MONGODB_URI || 'mongodb://heroku_3mjfnk1l:iqi60fhdgbgab2ffmf3vovlff5@ds121268.mlab.com:21268/heroku_3mjfnk1l',
  // DATA_BASE: 'mongodb://localhost:27017/straat',
  SESSION_SECRET: process.env.SESSION_SECRET || 'mysupersecretkey',
  CLOUDINARY: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'hvina6sjo',
    api_key: process.env.CLOUDINARY_API_KEY || '485521389972512',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'QOaJKE9sXc1qe4GHFYjNSFkFT68',
    url: process.env.CLOUDINARY_URL || 'cloudinary://485521389972512:QOaJKE9sXc1qe4GHFYjNSFkFT68@hvina6sjo'
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
    SEQRETARY_EMAIL: process.env.SEQRETARY_EMAIL || 'seqretary@gmail.com', // 'johnhiggins.avila@gmail.com'
    DELETED_TEAM_EMAIL: process.env.DELETED_TEAM_EMAIL || 'deletedEmailTema@info.com', // 'deletedteaam@straat.info'
    FEED_BACK_EMAIL: process.env.FEED_BACK_EMAIL || 'feedback@straat.info',
    DB_BACKUP_EMAIL: process.env.DB_BACKUP_EMAIL || 'mikusobrown@gmail.com'
  },
  GOOGLE: {
    // used in app
    apiKey: 'AIzaSyCYDM_gyqp1UGVClhh05ek_4G0zr4n55xA',
    fcmKey: 'AAAAWIq665Q:APA91bERF8GwK4Z2RhUPeXvzWaUSMtXkqxFXDPu4GZa7CJFRNvBbLqSEEcxZ9phyGacvevatkiCuIVhl3oJqO51tUNfzrKcgPSrNKS9gcwYORcdKKHvfZTc0wkO-1IWdmzKZbagCdl5R'
  },

  // postcode.ru
  POSTCODE: {
    POSTCODE_API_KEY: process.env.POSTCODE_API_KEY || 'gvuwmtomsB8eRf5Zgsfnj7zs8DE2ihC79DlEbQnb' // 'uBN0JsxZOIvnr034fj7W5uNjTIiI8et6AZ8OQi50'
  },

  SERVER_API: {
    INTERNAL: process.env.SERVER_API_INTERNAL || `http://127.0.0.1:${process.env.PORT || 5000}`
  }

}
