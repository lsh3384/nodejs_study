const getConnection = require('./db')

var exports = module.exports = {};

exports.get_member_info_by_id = function(id) {
  return new Promise((resolve, reject)=> {
    let sql = 'select * from member where id = ?;';
    getConnection().query(sql, [id], function(err, data) {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(data[0]);
    });
  })
}


