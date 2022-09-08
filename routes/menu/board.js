const express = require("express");
let router = express.Router();

const {get_work} = require("../../model/menu/board");


router.get("/board", async (req, res) => {
  
  res.render('menu/board', {
    work: await get_work(),
  });
})


router.get("/download_doc/:filename", async (req, res) => {
  
  console.log(filename)
  res.download("static/images/tidea_logo.png");
})


router.post("/download_doc", async (req, res) => {
  let filename = req.body.filename;
  console.log(filename)
  res.render('menu/board')
  // res.download("static/images/tidea_logo.png");
})



module.exports = router;