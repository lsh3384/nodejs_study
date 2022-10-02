'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('posts', 'thumbnail', {
      type: Sequelize.STRING(255)
  });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('posts', 'thumbnail');
  }
};
