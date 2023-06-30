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
  }, {
    tableName: 'podcasts', // Note: it is important to define the table name explicitly here
    // eslint-disable-next-line max-len
    timestamps: true, // Add this line to enable Sequelize's default timestamps without having to define createdAt and updatedAt in the model
  });

  Podcast.associate = (models) => {
    Podcast.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    Podcast.hasMany(models.Episode, {
      foreignKey: 'podcast_id',
      as: 'episodes',
    });
  };

  return Podcast;
};
