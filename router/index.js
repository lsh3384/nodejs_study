var express = require("express");
var router = express.Router();

const getConnection = require("../model/common/db")

function select_all() {
  return new Promise((resolve, reject)=> {
    let sql = 'select * from member;'
    getConnection().query(sql, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    })
  })
}


router.get('/main', async (req,res) => {
  let result = await select_all();
  console.log(result)
  res.render('main')
})


module.exports = router;