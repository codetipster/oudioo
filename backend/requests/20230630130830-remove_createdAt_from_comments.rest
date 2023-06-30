/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove created_at column from comments
    await queryInterface.removeColumn('comments', 'created_at');
  },

  async down(queryInterface, Sequelize) {
    // Add created_at column back to comments
    await queryInterface.addColumn('comments', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
