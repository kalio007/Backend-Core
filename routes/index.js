const express = require('express');
const router = express.Router();
// chore: import middleware
const auth = require('./auth')

// router.post('/',)
router.use('/auth', auth)

module.exports = router;