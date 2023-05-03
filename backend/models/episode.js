const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Episode = sequelize.define('Episode', {
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
    audio_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    podcast_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Podcast', // Note: the model name should match the name defined in the Podcast model (e.g., 'Podcast' or 'Podcasts')
        key: 'id',
      },
    },
  });

  Episode.associate = (models) => {
    Episode.belongsTo(models.Podcast, {
      foreignKey: 'podcast_id',
      as: 'podcast',
    });
  };

  return Episode;
};
