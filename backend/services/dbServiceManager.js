const UserService = require('./userService');

const USER_SERVICE = { name: 'UserService' };

let serviceMap = new WeakMap();

class DbServiceManager{
  constructor() {

  }
  static getServiceInstance(serviceType) {
    console.log('getServiceInstance');
    let instance = serviceMap.get(serviceType);

    if (instance === undefined) {
      if (serviceType === USER_SERVICE) {
        instance = new UserService();
      } else {
        instance = null;
      }
      return instance;
    }
  }

  static getUserServiceInstance() {
    console.log('getUserServiceInstance');
    return DbServiceManager.getServiceInstance(USER_SERVICE);
  } 
}

module.exports = DbServiceManager;