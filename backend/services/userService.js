const DbService = require('./dbService')

class UserService extends DbService {
  constructor() {
    super();
    console.log('UserService constructor');

    this.dao = this.getDao('user');
  }

  findAllUsers() {
    console.log('UserService, findAllUsers')
    return this.dao.findAll({
      order: [
        ['id', 'DESC']
      ]
    });
  }
}

module.exports = UserService;