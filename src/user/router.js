const router = require('express').Router();

router.get('/', (req, res) => res.end('get users'));

module.exports = router;
