'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('podcasts', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
    
    await queryInterface.addColumn('podcasts', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('podcasts', 'createdAt');
    await queryInterface.removeColumn('podcasts', 'updatedAt');
  }
};
