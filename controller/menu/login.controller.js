var exports = module.exports = {};

var passport = require("../../service/passport")

exports.get_login = function (req, res, next) {
  var error = req.flash('error')
  console.log("error!!!!!!!!!!!!!!!!!!!")
  console.log(error)
  if ( error[0] ===  'Incorrect Password') {
    console.log('Incorrect Password!!!!!!!')
    res.render("menu/login", {
      layout: false,
      error: '비밀번호를 잘못 입력하셨습니다.',
    });  
  } else {
    res.render("menu/login", {
      layout: false,
    });
  }
}

exports.post_login_action = async function (req, res, next) {
  console.log(req.body);        // req객체가 그대로 다음 미들웨어로 넘어감
  console.log(req.sessionID);   // req객체에 sessionID 속성으로 sessionID값 저장되어 있음
  console.log('login_action!!');
  next();                       // 다음 미들웨어를 실행 하도록 함
},

exports.get_logout = function (req, res) {
  req.session.destroy();          // mysql 쿠키 삭제
  console.log(req.sessionID); 
  res.clearCookie("session_id");  // 브라우저의 쿠키에 있는 session_id삭제
  res.redirect("/");
}

exports.passport_authenticate = passport.authenticate("local-login", {
  successRedirect: "/",         // 로그인 성공시 메인페이지로 이동
  failureRedirect: "/login",    // 로그인 실패시 로그인페이지로 이동
  failureFlash: true,           // 로그인 실패시 flash 메시지를 전달
})