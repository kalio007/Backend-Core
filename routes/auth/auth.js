const express = require('express')
const router = express.Router()
const { register } = require("../../controllers/user");

router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.post('/register', register)

module.exports = router;