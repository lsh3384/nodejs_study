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
  thumbnail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  use_yn: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "y",
  }
})

module.exports = PostDao;