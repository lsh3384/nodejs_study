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

  insertUser(name, email, password) {
    console.log('insertUser');
    return this.dao.create({
      name: name,
      email: email,
      password: password,
    })
  }
}

module.exports = UserService;
