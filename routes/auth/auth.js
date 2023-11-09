const express = require('express')
const router = express.Router()
const { register } = require("../../controllers/user");
const { login } = require("../../controllers/login");

router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.post('/register', register)
router.post('/login', login)

module.exports = router;