var mysql = require('mysql');

// -- NAS 접속 정보 --
var pool = mysql.createPool({
  connectionLimit: 100,
  host: '',
  user: '',
  database: '',
  password: ''
})


function getConnection() {
  return pool
}


module.exports = getConnection;