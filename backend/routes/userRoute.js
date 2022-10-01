var express = require("express");
var router = express.Router();

const UserController = require('./../controllers/userController');
const Passport = require("../middlewares/authMiddleware");

router.get("/getAllUsers", UserController.getAllUsers);
router.post("/insertUser", UserController.insertUser);
router.post("/login_action", UserController.loginAction);
router.get("/logout", UserController.logout);


module.exports = router;
