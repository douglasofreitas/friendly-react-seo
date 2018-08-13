import dotenv from 'dotenv';

dotenv.config();

export default {
  appTitle: process.env.APP_TITLE || '',
  appDescription: process.env.APP_DESCRIPTION || '',
  appImage: process.env.APP_IMAGE || '',
  port: process.env.APP_PORT || 8081,
  env: process.env.NODE_ENV || 'local',
};
