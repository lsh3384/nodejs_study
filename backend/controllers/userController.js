const DbServiceManager = require('./../services/dbServiceManager');


class UserController {
  static getAllUsers(req, res) {
    console.log('controller');
    const userService = DbServiceManager.getUserServiceInstance();
    console.log('controller');
    userService.findAllUsers().then((result) => {
      console.log(result);
      res.json(result.map(user => {
        delete user.dataValues.password;
        return user.dataValues;
      }))
    });
  }
}

module.exports = UserController;