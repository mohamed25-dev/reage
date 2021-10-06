const router = require('express').Router();
const createUser = require('./controller/createUser');
const login = require('./controller/login');

router.post('/', createUser);
router.post('/login', login);



module.exports = router;
