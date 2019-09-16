const { Router } = require('express');
const router = new Router();

const UsersService = require('../../service/UsersService');

const { create, findByEmail, findAll } = UsersService;

router.post('/', create);
router.get('/', findByEmail);
router.get('/all', findAll);

module.exports = router;
