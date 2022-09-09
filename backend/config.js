const dotenv = require('dotenv')
dotenv.config()

const config = {
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUsername: process.env.DB_USER_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  port: process.env.PORT,
};

module.exports = config