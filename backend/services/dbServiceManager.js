const UserService = require('./userService');
const PostService = require('./postService');

const USER_SERVICE = { name: 'UserService' };
const POST_SERVICE = { name: 'PostService' };


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
      } else if ( serviceType === POST_SERVICE ) {
        instance = new PostService();
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
  static getPostServiceInstance() {
    console.log('getPostServiceInstance');
    return DbServiceManager.getServiceInstance(POST_SERVICE);
  }
}

module.exports = DbServiceManager;