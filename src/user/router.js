const router = require('express').Router();
const auth = require('../middleware/auth');
const create = require('./controller/create');
const login = require('./controller/login');
const update = require('./controller/update');

router.post('/', create);
router.patch('/', auth, update);
router.post('/login', login);



module.exports = router;
