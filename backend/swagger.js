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
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              readOnly: true,
            },
            username: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            password_hash: {
              type: 'string',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            is_content_creator: {
              type: 'boolean',
            },
            role: {
              type: 'string',
            },
            verification_token: {
              type: 'string',
            },
            verification_token_expires: {
              type: 'string',
              format: 'date-time',
            },
            status: {
              type: 'string',
              enum: ['unverified', 'verified', 'blocked'],
            },
            password_reset_token: {
              type: 'string',
            },
            password_reset_token_expires: {
              type: 'string',
              format: 'date-time',
            },
          },
        },

        Podcast: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              readOnly: true,
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            cover_image_url: {
              type: 'string',
            },
            user_id: {
              type: 'integer',
            },
          },
        },

        Episode: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            audio_url: {
              type: 'string',
            },
            duration: {
              type: 'integer',
            },
            release_date: {
              type: 'string',
              format: 'date-time',
            },
            podcast_id: {
              type: 'integer',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // point to your route files
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
