const router = require('express').Router();
const auth = require('../middleware/auth');
const isAuth = require('../middleware/isAuth');
const uploadImage = require('../middleware/uploadImage');

const create = require('../post/controller/create');
const like = require('../post/controller/like');
const comment = require('../post/controller/comment');
const get = require('../post/controller/get');
const list = require('../post/controller/list');
const update = require('../post/controller/update');
const deletePost = require('../post/controller/delete');
const myImages = require('../post/controller/me');

router.get('/', list);
router.get('/me', auth, myImages)
router.get('/:id', isAuth, get);
router.delete('/:id', auth, deletePost);
router.post('/', auth, uploadImage, create);
router.post('/:id/like', auth, like);
router.patch('/:id/update', auth, uploadImage, update);
router.post('/:id/comment', auth, comment);

module.exports = router;