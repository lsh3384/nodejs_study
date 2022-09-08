const UserDao = require('../models/dao/userDao');
const DbHander = require('./../helpers/dbHandler');

class DbService {
  constructor() {
    this.dbHandler = DbHander.getDbInstance();

    this.models = [];
    this.initialized = false;

    this._init();
  }

  _init() {
    if(!this.initialized) {
      this.models['user'] = UserDao;

      this.initialized = true;
    }
  }

  getDao(key) {
    if (this.models[key]){
      return this.models[key];
    }

    return null;
  }

  
}