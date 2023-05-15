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
        model: 'Podcast', // singular and lowercase
        key: 'id',
      },
    },
  }, {
    timestamps: true,
    tableName: 'episodes',
    updatedAt: 'updated_at', // use snake case for the actual database column name
    createdAt: 'created_at', // use snake case for the actual database column name
  });

  Episode.associate = (models) => {
    Episode.belongsTo(models.Podcast, {
      foreignKey: 'podcast_id',
      as: 'podcast',
    });
  };

  return Episode;
};
