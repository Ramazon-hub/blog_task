require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  LOCAL_DB_URL: process.env.LOCAL_DB_URL,
  ELEPHANT_DB_URL:process.env.ELEPHANT_DB_URL,
  FILE_MAX_SIZE: process.env.FILE_MAX_SIZE,
  JWT_KEY: process.env.JWT_SECRET_KEY,
};
