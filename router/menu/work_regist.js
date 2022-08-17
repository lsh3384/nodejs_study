var express = require("express");
var router = express.Router();


const Work = require('./work_class');


const {}
= require('../../model/menu/work_regist');


let middleware = async (req,res,next) => {
  console.log('first middleware');
  next();
}


router.get('/work_regist'
, middleware 
,async (req, res) => {
  // let test_class = new Work(req.body);
  // console.log(test_class.title);
  // let result = await test_class.get_all_works();
  console.log('second middleware!')
  // console.log(result);

  res.render('menu/work_regist', {
    layout: false,
  })
})


router.post('/work_regist', async (req,res) => {
  let test_class = new Work();
  test_class.set_data_from_body(req.body);
  console.log(await test_class.get_all_works());

  res.render('menu/work_regist', {
    layout: false,
  })
})


module.exports = router;