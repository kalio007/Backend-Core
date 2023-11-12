const express = require('express')
const router = express.Router()
const { register } = require("../../controllers/user");
const { login } = require("../../controllers/login");
const { resetPasswood } = require('../../controllers/resetPassword');

router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.post('/register', register)
router.post('/login', login)
router.post('/reset-password', resetPasswood)

module.exports = router;