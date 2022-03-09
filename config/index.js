const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  APP: {
    PORT: process.env.APP_PORT || 5000,
    ENV: process.env.APP_ENV || 'development',
  },
  JWT: {
    sercetKey: process.env.SERCET_KEY,
    expiresIn: process.env.EXPIRES_IN,
  },
};
