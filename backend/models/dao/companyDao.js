const Sequelize = require('sequelize');

const DbHandler = require('../../helpers/dbHandler')

const CompanyDao = DbHandler.getDbInstance().define('company', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

module.exports = CompanyDao;