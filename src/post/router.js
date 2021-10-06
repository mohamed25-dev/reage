const router = require('express').Router();
const auth = require('../middleware/auth');
const create = require('../post/controller/create');
const like = require('../post/controller/like');
const comment = require('../post/controller/comment');
const get = require('../post/controller/get');
const list = require('../post/controller/list');

router.get('/', list);
router.get('/:id', get);
router.post('/', auth, create);
router.post('/:id/like', auth, like);
router.post('/:id/comment', auth, comment);

module.exports = router;