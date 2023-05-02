require('dotenv').config();  // import dotenv and invoke the config method to load the environment variables from the .env file
const { Pool } = require('pg'); // import the Pool object from the pg package

const pool = new Pool({ // create a new Pool object and store it in a variable called pool
  user: process.env.DB_USER, // replace with your own username
  host: process.env.DB_HOST, // replace with your own host
  database: process.env.DB_NAME, // replace with your own database name
  password: process.env.DB_PASSWORD, // replace with your own password
  port: process.env.DB_PORT, // Default PostgreSQL port is 5432
});


module.exports = pool; // export the pool object
