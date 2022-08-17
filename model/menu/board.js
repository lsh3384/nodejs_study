const getConnection = require('../common/db')

var exports = module.exports = {};

exports.get_work = function() {
  return new Promise((resolve, reject)=> {
    let sql = 'select * from board;';
    getConnection().query(sql, [], function(err, data) {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(data);
    });
  })
}