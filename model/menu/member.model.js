const getConnection = require('../common/db')

class Member {
  constructor(id='', pw='', name='', phone='', auth_cd='') {
    this.id = id;
    this.pw = pw;
    this.name = name;
    this.phone = phone;
    this.auth_cd = auth_cd;
  }

  get_id() {
    return this.id;
  }

  set_id(id) {
    this.id = id;
  }

  get_pw() {
    return this.pw;
  }

  set_pw(pw) {
    this.pw = pw;
  }

  get_name() {
    return this.name;
  }

  set_name(name) {
    this.name = name;
  }

  get_phone() {
    return this.phone;
  }

  set_phone(phone) {
    this.phone = phone;
  }

  get_auth_cd() {
    return this.auth_cd;
  }

  set_auth_cd(auth_cd) {
    this.auth_cd = auth_cd;
  }

  set_data_from_body(body) {
    let ele;
    for (ele in body){  
      this[ele] = body[ele];
    }
  }

  member_regist(id=this.id, pw=this.pw, name=this.name, phone=this.phone, auth_cd=this.auth_cd) {
    return new Promise((resolve, reject)=> {
      let sql = 'insert into member(id, pw, name, phone, auth_cd) values(?, HEX( AES_ENCRYPT(?,\'secret_key\') ), ?, ?, ?);';
      getConnection().query(sql, [id, pw, name, phone, auth_cd], function(err, data) {
        if(err) {
          console.log(err);
          reject(err);
        }
        resolve(data);
      });
    })
  }

  id_dup_check(id) {
    return new Promise((resolve, reject)=> {
      let sql = 'select count(*) as count from member where id = ?';
      getConnection().query(sql, [id], function(err, data) {
        if(err) {
          console.log(err);
          reject(err);
        }
        let id_count = data[0].count;
  
        console.log(id_count)
        let result;
        if (id_count >= 1) {
          result = {
            id_check : 'not ok'
          }
        } else {
          result = {
            id_check : 'ok'
          }
        }
        resolve(result);
      });
    })
  }
  
  get_all_auth_cds() {
    return new Promise((resolve, reject)=> {
      let sql = 'select * from auth';
      getConnection().query(sql, [], function(err, data) {
        if(err) {
          console.log(err);
          reject(err);
        }
        resolve(data);
      });
    })
  }
}




module.exports = Member;

// exports.member_regist = function(id, pw, name, phone, auth_cd) {
//   return new Promise((resolve, reject)=> {
//     let sql = 'insert into member(id, pw, name, phone, auth_cd) values(?, HEX( AES_ENCRYPT(?,\'secret_key\') ), ?, ?, ?);';
//     getConnection().query(sql, [id, pw, name, phone, auth_cd], function(err, data) {
//       if(err) {
//         console.log(err);
//         reject(err);
//       }
//       resolve(data);
//     });
//   })
// }


// exports.id_dup_check = function(id) {
//   return new Promise((resolve, reject)=> {
//     let sql = 'select count(*) as count from member where id = ?';
//     getConnection().query(sql, [id], function(err, data) {
//       if(err) {
//         console.log(err);
//         reject(err);
//       }
//       let id_count = data[0].count;

//       console.log(id_count)
//       let result;
//       if (id_count >= 1) {
//         result = {
//           id_check : 'not ok'
//         }
//       } else {
//         result = {
//           id_check : 'ok'
//         }
//       }
//       resolve(result);
//     });
//   })
// }


// exports.get_all_auth_cds = function() {
//   return new Promise((resolve, reject)=> {
//     let sql = 'select * from auth';
//     getConnection().query(sql, [], function(err, data) {
//       if(err) {
//         console.log(err);
//         reject(err);
//       }
//       resolve(data);
//     });
//   })
// }