const router = require('express').Router();

router.get('/', (req, res) => res.end('get posts'));

module.exports = router;