'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'password_reset_token', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'password_reset_token_expires', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'password_reset_token');
    await queryInterface.removeColumn('users', 'password_reset_token_expires');
  }
};
