const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    episode_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Episode',
        key: 'id',
      },
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Comment.belongsTo(models.Episode, {
      foreignKey: 'episode_id',
      as: 'episode',
    });
  };

  return Comment;
};