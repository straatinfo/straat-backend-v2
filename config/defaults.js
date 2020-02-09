module.exports = {
  db: process.env.MONGODB_URI,
  session_secret: process.env.SESSION_SECRET,
  coudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    url: process.env.CLOUDINARY_URL
  },
  sendgrid: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD,
    SENDGRID_USERNAME: process.env.SENDGRID_USERNAME
  },
  email_address: {
    STRAAT_INFO_EMAIL: process.env.STRAAT_INFO_EMAIL,
    NO_REPLY: 'no-reply@straat.info',
    NEW_TEAM_REQUEST: process.env.NEW_TEAM_REQUEST,
    UPDATE_REQUEST_EMAIL: process.env.UPDATE_REQUEST_EMAIL,
    SEQRETARY_EMAIL: process.env.SEQRETARY_EMAIL,
    DELETED_TEAM_EMAIL: process.env.DELETED_TEAM_EMAIL,
    FEED_BACK_EMAIL: process.env.FEED_BACK_EMAIL,
    DB_BACKUP_EMAIL: process.env.DB_BACKUP_EMAIL,
    TEST_HOST_EMAIL: process.env.TEST_HOST_EMAIL,
    NEW_HOST_DEFAULT_EMAIL: process.env.NEW_HOST_DEFAULT_EMAIL
  },
  google: {
    // used in app
    apiKey: process.env.GOOGLE_APP_API_KEY,
    fcmKey: process.env.GOOGLE_APP_FCM_KEY
  },

  urls: {
    FRONT_END_URL: process.env.FRONT_END_URL
  },

  // postcode.ru
  postcode: {
    POSTCODE_API_KEY: process.env.POSTCODE_API_KEY
  },

  server_api: {
    INTERNAL: process.env.SERVER_API_INTERNAL
  },
  fcm: {
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
