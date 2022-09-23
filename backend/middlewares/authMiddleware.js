var passport = require('passport');

const DbServiceManager = require('../services/dbServiceManager');


// serialize & deserialize User
// 처음 로그인할 때만 실행하여 sessionID 저장
passport.serializeUser(async function(user, done) {
  console.log('serializeUser!');
  done(null, user.id);
});


// 매번 접속할 때마다 실행하여 sessionID확인
passport.deserializeUser(function(id, done) {
  console.log('deserializeUser!');
  done(null, id);
});


// local strategy
var LocalStrategy = require('passport-local').Strategy;
passport.use('local-login',
  new LocalStrategy({
      usernameField : 'id',   // req.body 객체에 해당 이름으로 추가해서 사용할 수 있도록 해줌
      passwordField : 'pw',   // req.body 객체에 해당 이름으로 추가해서 사용할 수 있도록 해줌
      passReqToCallback : true,
      session: true
    },
    async function(req, username, password, done) {
      console.log("------------------------------")
      console.log(req.body.id)
      let id = req.body.id;
      let pw = req.body.pw;

      const userService = DbServiceManager.getUserServiceInstance();
      let validate_result = userService.validatePassword(pw, id).then((result) => result )
      
      if(validate_result) {
        return done(null, {
          id: id
        });
      } else {
        return done(null, false, { message: 'Incorrect Password'} ); 
      }
    }
  )
);

module.exports = passport;