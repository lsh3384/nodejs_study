const DbService = require('./dbService')

class UserService extends DbService {
  constructor() {
    super();

    this.dao = this.getDao('user');
  }

  
}