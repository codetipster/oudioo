const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_content_creator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'listener',
    },
    verification_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verification_token_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: { // new field
      type: DataTypes.ENUM('unverified', 'verified', 'blocked'), // set values to allow for better control
      defaultValue: 'unverified', // set default value
      allowNull: false,
    },
    
  }, {
    tableName: 'users',
    timestamps: true, // Add this line to enable Sequelize's default timestamps
    createdAt: 'created_at', // Map 'createdAt' to 'created_at'
    updatedAt: false, // Disable 'updatedAt' as it is not present in the model
  });

  return User;
};
