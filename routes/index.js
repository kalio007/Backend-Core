const express = require('express');
const router = express.Router();
const auth = require('./auth/auth')

router.get('/', (req, res) => {
    res.send('Welcome! explore our api')
})
router.use('/auth', auth)

module.exports = router;