const db = require('../db');

describe('db.js', () => {
  test('exports a Sequelize instance', () => {
    expect(db.constructor.name).toBe('Sequelize');
  });

  test('connects to the database successfully', async () => {
    await expect(db.authenticate()).resolves.toBeUndefined();
  });

  test('throws an error if it fails to connect to the database', async () => {
    const originalConfig = { ...db.config };
    db.config.database = 'invalid_database_name';

    try {
      await db.authenticate();
    } catch (error) {
      expect(error).toBeTruthy();
    } finally {
      db.config.database = originalConfig.database;
    }
  });
});
