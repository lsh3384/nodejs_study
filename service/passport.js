const getConnection = require('../model/common/db')

function pw_check(id, pw) {
  return new Promise((resolve, reject)=> {
    getConnection().query('select count(*) as count from member where id=? and pw=HEX(AES_ENCRYPT(?,\'secret_key\'))',[id, pw], function(err, data) {
      console.log('pw_check');
      if(err) {
        reject(err);
      }
      
      let pw_check_result = data[0].count;
      if (pw_check_result == 1) {
        resolve(true);
      } else {
        console.log(data)
        resolve(false);
      }
    });
  });
}

var passport = require('passport');
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
      console.log('pw_check!!')
      let pw_check_result = await pw_check(id, pw);
      
      if(pw_check_result === true) {
        return done(null, {
          id: id
        });
      } else {
        // req.flash('info', 'flash is back!');
        return done(null, false, { message: 'Incorrect Password'} ); 
      }
    }
  )
);

module.exports = passport;