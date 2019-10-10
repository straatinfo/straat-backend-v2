module.exports = {
  DATA_BASE: process.env.MONGODB_URI,
  // DATA_BASE: 'mongodb://localhost:27017/straat',
  SESSION_SECRET: process.env.SESSION_SECRET,
  CLOUDINARY: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    url: process.env.CLOUDINARY_URL
  },
  SENDGRID: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD,
    SENDGRID_USERNAME: process.env.SENDGRID_USERNAME
  },
  EMAIL_ADDRESSES: {
    STRAAT_INFO_EMAIL: process.env.STRAAT_INFO_EMAIL,
    NO_REPLY: 'no-reply@straat.info',
    NEW_TEAM_REQUEST: process.env.NEW_TEAM_REQUEST,
    UPDATE_REQUEST_EMAIL: process.env.UPDATE_REQUEST_EMAIL,
    SEQRETARY_EMAIL: process.env.SEQRETARY_EMAIL,
    DELETED_TEAM_EMAIL: process.env.DELETED_TEAM_EMAIL,
    FEED_BACK_EMAIL: process.env.FEED_BACK_EMAIL,
    DB_BACKUP_EMAIL: process.env.DB_BACKUP_EMAIL,
    TEST_HOST_EMAIL: process.env.TEST_HOST_EMAIL,
    HOST_EMAIL_CC: process.env.HOST_EMAIL_CC
  },
  GOOGLE: {
    // used in app
    apiKey: 'AIzaSyCYDM_gyqp1UGVClhh05ek_4G0zr4n55xA',
    fcmKey: 'AAAAWIq665Q:APA91bERF8GwK4Z2RhUPeXvzWaUSMtXkqxFXDPu4GZa7CJFRNvBbLqSEEcxZ9phyGacvevatkiCuIVhl3oJqO51tUNfzrKcgPSrNKS9gcwYORcdKKHvfZTc0wkO-1IWdmzKZbagCdl5R'
  },

  // postcode.ru
  POSTCODE: {
    POSTCODE_API_KEY: process.env.POSTCODE_API_KEY
  },

  SERVER_API: {
    INTERNAL: process.env.SERVER_API_INTERNAL || `http://127.0.0.1:${process.env.PORT || 5000}`
  },
  FCM: {
    "type": "service_account",
    "project_id": process.env.FCM_PROJECT_ID,
    "private_key_id": process.env.FCM_PRIVATE_KEY_ID,
    "private_key": process.env.FCM_PRIVATE_KEY,
    "client_email": process.env.FCM_CLIENT_EMAIL,
    "client_id": process.env.FCM_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.FCM_CLIENT_CERT_URL
  }
}
