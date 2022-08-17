const express = require("express");
let router = express.Router();

const login_check_middleware = require('../../service/login_check_middleware');
const auth_check_middleware = require('../../service/auth_check_middleware');
const main_controller = require('../../controller/menu/main.controller');

router.get("/", login_check_middleware, auth_check_middleware, main_controller)


module.exports = router;