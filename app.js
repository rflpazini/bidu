const express = require('express');
const chalk = require('chalk');

const app = express();
const bodyParser = require('body-parser');

const config = require('./config');

const apiRouter = require('./src/router');

app.use(bodyParser.json());
app.use(apiRouter);

const port = process.env.PORT || config.server.port,
  server = app.listen(port, () => {
    console.log(
      '%s %s is running at http://localhost:%d',
      chalk.green('✓'),
      config.name,
      port
    );
  });

module.exports = server;
