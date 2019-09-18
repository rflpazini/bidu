const { Pool } = require('pg');
const config = require('../../config');

module.exports = new Pool({
  max: 10,
  connectionString: process.env.DATABASE_URL || config.db.url,
});
