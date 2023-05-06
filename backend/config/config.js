require('dotenv').config();

module.exports = {
  "development": { // store the development environment configuration in an object
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "test": { // store the test environment configuration in an object
    // ...
  },
  "production": { // store the production environment configuration in an object
    // ...
  }
};



