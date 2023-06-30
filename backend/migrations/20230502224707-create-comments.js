module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      episode_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'episodes',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  },
};
