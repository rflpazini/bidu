const sql = require('sql-template-strings');

const db = require('./DataBase');

const ensureMigrationsTable = db => console.debug(db);
db.query(
  'CREATE TABLE IF NOT EXISTS migrations (id integer PRIMARY KEY, data jsonb NOT NULL)'
);

const postgresStateStorage = {
  async load(fn) {
    await db.connect();

    await ensureMigrationsTable(db);
    const { rows } = await db.query('SELECT data FROM migrations');

    if (rows.length !== 1) {
      console.log(
        'Cannot read migrations from database. If this is the first time you run migrations, then this is normal.'
      );

      return fn(null, {});
    }

    fn(null, rows[0].data);
  },

  async save(set, fn) {
    await db.connect();

    await ensureMigrationsTable(db);

    const migrationMetaData = {
      lastRun: set.lastRun,
      migrations: set.migrations,
    };

    await db.query(sql`
      INSERT INTO migrations (id, data)
      VALUES (1, ${migrationMetaData})
      ON CONFLICT (id) DO UPDATE SET data = ${migrationMetaData}
    `);

    fn();
  },
};

module.exports = Object.assign(() => {
  return postgresStateStorage;
}, postgresStateStorage);
