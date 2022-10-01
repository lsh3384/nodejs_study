const Sequelize = require('sequelize');

const DbHandler = require('../../helpers/dbHandler')

const PostDao = DbHandler.getDbInstance().define('post', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  writer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = PostDao;