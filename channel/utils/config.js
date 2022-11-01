require('dotenv').config();

const PORT = process.env.PORT;
const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.DEV_BASE_URL : process.env.BASE_URL;
const DOMAIN = process.env.DOMAIN;
const TOKEN = process.env.REQUEST_TOKEN;
const SECRET = process.env.SECRET;

module.exports = {
  PORT: PORT,
  BASE_URL: BASE_URL,
  DOMAIN: DOMAIN,
  TOKEN: TOKEN,
  SECRET: SECRET,
};
