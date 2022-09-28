var express = require("express");
var router = express.Router();

const UserController = require('./../controllers/userController');
const Passport = require("../middlewares/authMiddleware");

router.get("/getAllUsers", UserController.getAllUsers);
router.post("/insertUser", UserController.insertUser);
// router.post(
//   "/login_action", (req, res, next) => {
//     Passport.authenticate("local-login", function (err, user, info) {
//       console.log("req.user: " + JSON.stringify(user));
//       let json = JSON.parse(JSON.stringify(user));

//       if (!user) {
//         res.status(401).send({
//           code: "401",
//           message: "login_failure",
//         });
//       } else {
//         req.user = user;
//         res.send({message: "login_success"})
//         return next();
//       }
//     })(req, res, next);
//   }
// );

router.post("/login_action", UserController.loginAction);


module.exports = router;
