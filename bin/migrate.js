const path = require('path');
const migrate = require('migrate');

const stateStore = require('../src/persistence/StateStorage');

const migrationsDirectory = path.resolve(__dirname, '../src/migrations');

const [command] = process.argv.slice(2);

new Promise((resolve, reject) => {
  console.debug(stateStore)
  migrate.load(
    {
      stateStore,
      migrationsDirectory
    },
    (err, set) => {
      if (err) {
        reject(err);
      }

      if (typeof set[command] !== 'function') {
        reject(new Error('Command is not a function'));
      }

      set[command](err => {
        if (err) reject(err);
        resolve();
      });
    }
  );
})
  .then(() => {
    console.debug(`Migrations "${command}" successfully ran`);
    process.exit(0);
  })
  .catch(error => {
    console.error(error.stack);
    process.exit(1);
  });
