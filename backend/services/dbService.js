const UserDao = require('../models/dao/userDao');
const DbHander = require('../helpers/dbHandler');

let _dbService = new WeakMap();
const _dbServiceRef = { className: 'DbService' };


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

  static getInstance() {
    console.log('getInstance called');
    let instance = _dbService.get(_dbServiceRef);
    if (instance === null || instance === undefined) {
      instance = new DbService();
      _dbService.set(_dbServiceRef, instance);
    }

    return instance;
  }

  getDbHandler() {
    return this.dbHandler;
  }

  getDao(key) {
    console.log('getDao')
    if (this.models[key]){
      return this.models[key];
    }

    return null;
  }

  sync() {
    return new Promise((resolve, reject)=> {
      this.dbHandler
      .sync()
      .then(() => {
        console.log('Database sync process completed')
        resolve('Database sync process completed')
      })
      .catch((err) => {
        reject(err);
      });
    })
  }
}

module.exports = DbService;