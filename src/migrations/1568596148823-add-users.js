const db = require('../persistence/DataBase');

module.exports.up = async function(next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
      );
  `);

  await client.query(`
  CREATE INDEX users_email on users (email);
  `);

  await client.release(true);
  next();
};

module.exports.down = async function(next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE users;
  `);

  await client.release(true);
  next();
};
