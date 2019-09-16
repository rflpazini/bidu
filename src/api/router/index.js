const express = require('express');
const router = express.Router();

const users = require('./Users');

router.use('/users', users);

router.get('/ping', (req, res) => {
  res.send('pong');
});

module.exports = router;
