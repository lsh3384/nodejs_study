const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()


// -- NAS 접속 정보 --
var pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.host,
  user: process.env.user,
  database: process.env.database,
  password: process.env.password
})

function getConnection() {
  return pool
}


module.exports = getConnection;