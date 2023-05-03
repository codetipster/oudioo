const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Podcast = sequelize.define('Podcast', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover_image_url: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Note: the model name should match the name defined in the User model (e.g., 'User' or 'Users')
        key: 'id',
      },
    },
  });

  Podcast.associate = (models) => {
    Podcast.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Podcast;
};
