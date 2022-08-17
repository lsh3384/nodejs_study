const getConnection = require('../model/common/db')


function get_member_auth(id) {
  return new Promise((resolve, reject) => {
    let sql = 'select auth_cd from member where id = ?';
    getConnection().query(sql, [id], (err, data) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(data[0].auth_cd);
    })
  })
}


function get_menu_auth(url) {
  return new Promise((resolve, reject) => {
    let sql = 'select menu_auth from menu where menu_url = ?;';
    getConnection().query(sql, [url], (err, data) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      resolve(data[0].menu_auth);
    })
  })
}


const auth_check_middleware = async (req, res, next) => {
  let member_auth = await get_member_auth(req.user);
  let menu_auth = await get_menu_auth('/');
  console.log(member_auth);
  console.log(menu_auth);
  if (menu_auth.includes(member_auth)) {
    console.log('includes!!!!!!!!!!!!')
  }
  next()
}


module.exports = auth_check_middleware;