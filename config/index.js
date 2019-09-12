const defaultConfig = require('./default');
let environment;

if (process.env.SCOPE === 'prod') {
  console.log('[ENVIRONMENT]: Production');
} else if (process.env.NODE_ENV === 'staging') {
  console.log('[ENVIRONMENT]: Staging');
} else {
  console.log('[ENVIRONMENT]: Development');
  environment = defaultConfig;
}

module.exports = environment;
