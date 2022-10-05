const DbServiceManager = require('./../services/dbServiceManager');
const Passport = require("../middlewares/authMiddleware");

class UserController {
  static getAllUsers(req, res) {
    const userService = DbServiceManager.getUserServiceInstance();
    userService.findAllUsers().then((result) => {
      // console.log(result);
      res.json(result.map(user => {
        delete user.dataValues.password;
        return user.dataValues;
      }))
    });
  }

  static insertUser(req, res) {
    // console.log('/insertUser');
    // console.log(req.body);
    const userService = DbServiceManager.getUserServiceInstance();
    userService.insertUser(req.body).then((result) => {
      console.log('insertion completed!');
    });
  }

  static loginAction = (req, res, next) => {
    Passport.authenticate("local-login", async function (err, user, info) {
      console.log("req.user: " + JSON.stringify(user));
      let json = JSON.parse(JSON.stringify(user));

      if (!user) {
        res.status(401).send({
          code: "401",
          message: "login_failure",
        });
      } else {
        // req.user = user;
        // console.log(user);
        const userService = DbServiceManager.getUserServiceInstance();
        let result = await userService.findUserById(user.id);
        // console.log(result);
        // req.logIn(user, () => {});
        res.send({status: "login_success", ...result.dataValues})

        return next();
      }
    })(req, res, next);
  }

  static logout = (req, res) => {


    req.session.destroy(function (err){
      res.clearCookie("session_id");
      console.log(req.sessionID);
      console.log('logout!!!!!!!!!!!!!!!!!!')
      res.send({status: "logout_success"});
    });
    // req.session.destroy();

  }
}

module.exports = UserController;
