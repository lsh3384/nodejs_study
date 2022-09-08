const dotenv = require('dotenv')
dotenv.config()

const config = {
  dbHost: process.env.HOST,
  dbPort: process.env.PORT,
  dbUsername: process.env.USER_NAME,
  dbPassword: process.env.PASSWORD,
  dbName: process.env.DATABASE,
};

module.exports = config