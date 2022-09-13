var express = require("express");
var router = express.Router();

const UserController = require('./../controllers/userController');

router.get("/getAllUsers", UserController.getAllUsers);
router.get("/test", function (req, res) {
  console.log('test called');
  let result = {
    data: 'testing!'
  }
  res.json(result);
})

module.exports = router;
