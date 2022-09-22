const Sequelize = require('sequelize');

const { hash, compareHash } = require('../../utils/encryptionUtil');

const DbHandler = require('../../helpers/dbHandler')

const UserDao = DbHandler.getDbInstance().define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

// lifecycle method for hashing password before creating a user
UserDao.beforeCreate((user, options) => {
  return hash(user.password).then(retObj => {
      user.password = retObj.hash;
  });
});

// instance method for comparing candidate password and hashed password
UserDao.prototype.compareHash = function(candidatePassword) {
  return compareHash(candidatePassword, this.password);
};

module.exports = UserDao;