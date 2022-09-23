const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cors = require('cors');
const path = require("path");
const bodyParser = require("body-parser");

const Config = require('./config');
const AuthMiddleware = require("./middlewares/authMiddleware");


const app = express(); // 클라이언트와 통신

let express_mysql_seesion_options = {
  host: Config.dbHost,
	port: Config.dbPort,
	user: Config.dbUsername,
	password: Config.dbPassword,
	database: Config.dbName,
  clearExpired: true,
  expiration: 24 * 60 * 60 * 1000,     // mysql세션에 저장되는 세션의 만료 시간을 정함 -> express-session에서 브라우저의 쿠키도 같이 변경해야 함
  checkExpirationInterval: 10 * 1000,
};
var sessionStore = new MySQLStore(express_mysql_seesion_options);
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

let corsOptions = {
  origin: "*",
  Credential: true,
}
app.use(cors(corsOptions));


app.use(AuthMiddleware.initialize());
app.use(AuthMiddleware.session());

var flash = require('connect-flash');
app.use(flash())

app.use(express.static(path.join(__dirname, "/static")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require("./routes/indexRoutes"));

module.exports = app;