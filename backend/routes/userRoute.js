var express = require("express");
var router = express.Router();

const UserController = require('./../controllers/userController');
const Passport = require("../middlewares/authMiddleware");

router.get("/getAllUsers", UserController.getAllUsers);
router.post("/insertUser", UserController.insertUser);
router.post(
  "/login_action",
  Passport.authenticate("local-login", {
    // successRedirect: "/",
    // failureRedirect: "/login",
    failureFlash: true,
  }),
);


module.exports = router;
