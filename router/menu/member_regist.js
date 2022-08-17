var express = require("express");
var router = express.Router();

const member_controller = require('../../controller/menu/member.controller')

router.get('/member_regist', member_controller.get_member_regist);
router.post('/member_regist', member_controller.post_member_regist);
router.post('/id_dup_check', member_controller.post_id_dup_check);

module.exports = router;