/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('comments', 'created_at');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('comments', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
