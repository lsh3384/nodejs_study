const {get_member_info_by_id} = require("../../model/common/member.model");

const main_controller = async (req, res) => {
  res.render('menu/main', {
    member_info: await get_member_info_by_id(req.user),
  });
}

module.exports = main_controller;