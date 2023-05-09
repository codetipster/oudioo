const request = require('supertest');
const { app, server } = require('../index');

describe('Test the server', () => {
  beforeAll(() => {
    server;
  });

  afterAll(async () => {
    await server.close();
  });

  test('It should respond with a 200 status code and "Hello, world!"', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
