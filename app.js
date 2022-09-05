/* express */
const express = require("express");
const app = express(); // 클라이언트와 통신


/* login & session */
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
const getConnection = require("./model/common/db");
const connection = getConnection();
let express_mysql_seesion_options = {
  clearExpired: true,
  expiration: 24 * 60 * 60 * 1000,     // mysql세션에 저장되는 세션의 만료 시간을 정함 -> express-session에서 브라우저의 쿠키도 같이 변경해야 함
  checkExpirationInterval: 10 * 1000,
};
var sessionStore = new MySQLStore(express_mysql_seesion_options, connection);
app.use(
  session({
    key: "session_id_test", // 쿠키에 보여지는 이름
    secret: "session_cookie_secret",
    store: sessionStore, // 위에서 설정한 express-mysql-session으로 mysql에 저장하겠다는 것을 나타냄
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24* 60 * 60 * 1000 }, //브라우저에서 쿠키의 expiration 시간을 정함.
  })
);


/* Passport */
var passport = require("./service/passport");
app.use(passport.initialize());
app.use(passport.session());



/* flash */
var flash = require('connect-flash');
app.use(flash())


/* view */
app.set("view engine", "ejs");
var expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
// app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout", "common/layout");


/* static folder */
const path = require("path");
app.use(express.static(path.join(__dirname, "/static")));


/* req.body parser */
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* router */
app.use(require("./router/index"));
app.use(require("./router/menu/main"));
app.use(require("./router/menu/login"));
app.use(require("./router/menu/member_regist"));
app.use(require("./router/menu/board"));
app.use(require("./router/menu/work_regist"));


/* Port setting */
var port = 3030;


/* server listen */
const server = app.listen(port, function () {
  console.log("server on! http://localhost:" + port);
  console.log('server')
 });