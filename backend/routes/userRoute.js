var express = require("express");
var router = express.Router();

const UserController = require('./../controllers/userController');
const Passport = require("../middlewares/authMiddleware");

router.get("/getAllUsers", UserController.getAllUsers);
router.post("/insertUser", UserController.insertUser);
router.post(
  "/login_action", (req, res, next) => {
    Passport.authenticate("local-login", function (err, user, info) {
      console.log("req.user: " + JSON.stringify(user));
      let json = JSON.parse(JSON.stringify(user));

      if (!user) {
        res.status(401).send({
          code: "401",
          message: "로그인 실패",
        });
      } else {
        req.user = user;
        res.send({message: "로그인 성공"})
        return next();
      }
    })(req, res, next);
  }
);


module.exports = router;
