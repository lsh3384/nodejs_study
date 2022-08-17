var express = require("express");
var router = express.Router();

const login_controller = require('../../controller/menu/login.controller');

router.get("/login", login_controller.get_login);
router.post("/login_action", login_controller.post_login_action, login_controller.passport_authenticate);
router.get("/logout", login_controller.get_logout);

module.exports = router;