const express = require('express');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const podcastRoutes = require('./routes/podcastRoutes');
const swaggerUi = require('swagger-ui-express'); // Import swagger UI for API documentation
const swaggerSpec = require('./swagger'); // Import swagger specification

const app = express();
app.use(express.json()); // Add this line to parse JSON request bodies
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users', userRoutes);
app.use('/podcasts', podcastRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { app, server };