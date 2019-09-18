const express = require('express');
const router = express.Router();

const config = require('../../../config');
const users = require('./Users');

router.use(`/${config.version}/users`, users);

router.get('/ping', (req, res) => {
  return res.status(200).send('pong');
});

module.exports = router;
