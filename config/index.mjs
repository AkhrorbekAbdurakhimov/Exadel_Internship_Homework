import dotenv from 'dotenv';

dotenv.config();

export const App = {
  PORT: process.env.APP_PORT || 5000,
  ENV: process.env.APP_ENV || 'development',
};

export const JWT = {
  sercetKey: process.env.SERCET_KEY,
  expiresIn: process.env.EXPIRES_IN,
};

export const DB = {
  MONGO_CONNECTION_STR: process.env.MONGO_CONNECTION_STR,
};
