const express = require('express')
const router = express.Router()
const { register } = require("../../controllers/user");
const { login } = require("../../controllers/login");
const { getResetPasswood, postResetPassword } = require('../../controllers/resetPassword');
const { forgotPassword } = require("../../controllers/forgotPassword");

router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.post('/register', register)
router.post('/login', login)
router.get('/reset-password', getResetPasswood)
router.post('/reset-password', postResetPassword)
router.post('/forgot-password', forgotPassword)

module.exports = router;