const { Router } = require('express');
const router = new Router();

const UsersService = require('../../service/UsersService');

const { create, findByEmail, findAll, deleteUser, login } = UsersService;

router.post('/', create);
router.post('/login', login);

router.get('/', findByEmail);
router.get('/all', findAll);

router.delete('/', deleteUser);

module.exports = router;
