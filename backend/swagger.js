const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Oudioo API',
      version: '1.0.0',
      description: 'A simple Express API for Oudioo',
    },
    servers: [
      {
        url: 'http://localhost:3002',
      },
    ],
    
  },
  apis: ['./routes/*.js'], // point to your route files
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
