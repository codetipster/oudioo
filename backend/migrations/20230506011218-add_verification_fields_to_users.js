'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'verification_token', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'verification_token_expires', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('NOW() + INTERVAL \'1 HOUR\''),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'verification_token');
    await queryInterface.removeColumn('users', 'verification_token_expires');
  }
};

