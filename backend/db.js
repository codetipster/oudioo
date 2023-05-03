const { Sequelize } = require('sequelize'); // import the Sequelize class from the sequelize package
const config = require('./config/config'); // import the config object

const sequelize = new Sequelize( // create a new Sequelize instance and store it in a variable called sequelize
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

(async () => { // create an async function and invoke it immediately
  try {
    await sequelize.authenticate();  // authenticate the connection to the database
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;

