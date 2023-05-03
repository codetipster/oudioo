const express = require('express'); // import express from 'express';
require('dotenv').config();
const app = express(); // store the express app in a variable called app

app.get('/', (request, response) => { // create a route for the root path. the callback function will be executed when a GET request is made to the root path.
  response.send('<h1>Hello, worldddd!</h1>'); // send a response when the root path is accessed
});

const PORT = process.env.PORT || 3000; // store the port number in a variable
const server = app.listen(PORT, () => { // start the server
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { app, server }; // export the app and server variables

