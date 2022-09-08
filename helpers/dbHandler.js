const Sequelize = require('sequelize');
const Config = require('./../config');

let _dbHandler = new WeakMap();
const _dbHandlerRef = {className: 'DbHandler'};

class DbHandler {
  constructor(dbHost, dbPort, dbUsername, dbPassword, dbName) {
    this.dbHost = dbHost;
    this.dbPort = dbPort;
    this.dbUsername = dbUsername;
    this.dbPassword = dbPassword;
    this.dbName = dbName;
  }

  getDbInstance() {
    let instance = _dbHandler.get(_dbHandlerRef);
    if(instance === null || instance === undefined) {
      const connString = this._createDbConnString();
      instance = new Sequelize(connString, {omitNull: true, logging: false, timezone: '+09:00'})

      _dbHandler.set(_dbHandlerRef, instance);
    }

    return instance;
  }

  _createDbConnString() {
    return 'mysql://' + this.dbUsername + ':' + this.dbPassword + '@' + this.dbHost + ':' + this.dbPort + '/' + this.dbName;
  }
}

let DbHandlerInstance = new DbHandler(Config.dbHost, Config.dbPort, Config.dbUsername, Config.dbPassword, Config.dbName, Config.coreSdnDbName, Config.intNmsDbName);

module.exports = DbHandlerInstance