const UserService = require('./userService');
const CompanyService = require('./companyService');

const USER_SERVICE = { name: 'UserService' };
const COMPANY_SERVICE = { name: 'CompanyService' };


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
      } else if ( serviceType === COMPANY_SERVICE ) {
        instance = new CompanyService();
      }
      else {
        instance = null;
      }
      return instance;
    }
  }

  static getUserServiceInstance() {
    console.log('getUserServiceInstance');
    return DbServiceManager.getServiceInstance(USER_SERVICE);
  }
  static getCompanyServiceInstance() {
    console.log('getCompanyServiceInstance');
    return DbServiceManager.getServiceInstance(COMPANY_SERVICE);
  }
}

module.exports = DbServiceManager;