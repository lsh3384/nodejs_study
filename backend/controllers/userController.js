const DbServiceManager = require('./../services/dbServiceManager');


class UserController {
  static getAllUsers(req, res) {
    const userService = DbServiceManager.getUserServiceInstance();
    userService.findAllUsers().then((result) => {
      console.log(result);
      res.json(result.map(user => {
        delete user.dataValues.password;
        return user.dataValues;
      }))
    });
  }

  static insertUser(req, res) {
    console.log('/insertUser');
    console.log(req.body);
    const userService = DbServiceManager.getUserServiceInstance();
    userService.insertUser(req.body).then((result) => {
      console.log('insertion completed!');
    });
  }
}

module.exports = UserController;
