'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('posts', 'use_yn', {
      type: Sequelize.STRING(255)
  });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('posts', 'use_yn');
  }
};
