var express = require("express");
var router = express.Router();

const UserController = require('./../controllers/userController');

router.get("/getAllUsers", UserController.getAllUsers);

module.exports = router;