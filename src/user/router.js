const router = require('express').Router();
const auth = require('../middleware/auth');
const create = require('./controller/create');
const login = require('./controller/login');
const update = require('./controller/update');
const updateProfile = require('./controller/updateProfile');
const updatePassword = require('./controller/updatePassword');


router.post('/', create);
router.patch('/', auth, update);
router.patch('/profile', auth, updateProfile);
router.patch('/password', auth, updatePassword);
router.post('/login', login);

module.exports = router;
