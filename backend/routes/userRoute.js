var express = require("express");
var router = express.Router();

const UserController = require('./../controllers/userController');

router.get("/getAllUsers", UserController.getAllUsers);
router.post("/insertUser", UserController.insertUser);

router.get("/test", function (req, res) {
  let result = {
    data: 'testing!'
  }
  res.json(result);
})

module.exports = router;
