const getConnection = require('../common/db')

var exports = module.exports = {};

exports.work_regist = function() {
  return new Promise((resolve, reject)=> {
    let sql = 'insert into member() values();';
    getConnection().query(sql, [], function(err, data) {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(data);
    });
  })
}