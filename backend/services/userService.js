const DbService = require('./dbService')

class UserService extends DbService {
  constructor() {
    super();
    // console.log('UserService constructor');

    this.dao = this.getDao('user');
  }

  findAllUsers() {
    // console.log('UserService, findAllUsers')
    return this.dao.findAll({
      order: [
        ['id', 'DESC']
      ]
    });
  }

  insertUser({id, name, email, password}) {
    return this.dao.create({
      id: id,
      name: name,
      email: email,
      password: password,
    })
  }

  findUserById(id) {
    return this.dao.findOne({
      where: {
        id: id,
      },
    });
  }

  validatePassword(candidatePassword, userId) {
    return this.dao.findOne({ where: { id: userId } }).then((result) => {
      return result.compareHash(candidatePassword);
    });
  }

}

module.exports = UserService;
