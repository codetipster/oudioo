const pool = require('../db'); // import the pool object

describe('Database Connection', () => { // describe the test suite
  test('should connect to the database', async () => {  // describe the test
    // Run a simple query to test the connection
    const result = await pool.query('SELECT 1'); // store the result of the query in a variable called result

    // Check if the query result is as expected
    expect(result.rows[0]).toEqual({ '?column?': 1 }); // expect the first row of the result to be an object with a key of ?column? and a value of 1
  });

  afterAll(() => { // after all the tests are run, close the connection to the database
    pool.end();
  });
});
