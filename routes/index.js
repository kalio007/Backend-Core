const express = require('express');
const router = express.Router();
const register = require('./login/index')
const auth = require('./auth')

router.get('/', (req, res) => {
    res.send('Welcome! explore our api')
})
router.use('/auth', auth)
router.use('/register', register);

module.exports = router;