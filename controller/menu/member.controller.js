var exports = module.exports = {};

const Member
= require('../../model/menu/member.model');

exports.get_member_regist = async (req,res) => {
  
  let member_dao = new Member();
  let all_auth_cds = await member_dao.get_all_auth_cds();
  console.log(all_auth_cds)
  res.render('menu/member_regist', {
    layout: false,
    all_auth_cds: all_auth_cds,
  })
}

exports.post_member_regist = async (req,res) => {
  console.log("======================== post_member_regist start ============================");
  let member_dao = new Member();
  member_dao.set_data_from_body(req.body);
  // let id = req.body.id;
  // let pw = req.body.pw;
  // let name = req.body.name;
  // let phone = req.body.phone;
  // let auth_cd = req.body.auth_cd;
  // let result = await member_regist(id, pw, name, phone, auth_cd);
  let result = await member_dao.member_regist();
  console.log(result);
  console.log(result.constructor.name);
  res.render('menu/member_regist', {
    layout: false,
    all_auth_cds: await member_dao.get_all_auth_cds(),
  })
}

exports.post_id_dup_check = async (req,res) => {
  let member_dao = new Member();
  let result = await member_dao.id_dup_check(req.body.id);
  console.log(result)
  res.send(result)
}