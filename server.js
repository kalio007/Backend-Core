const express = require('express');
require('dotenv').config();
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000
const routes = require('./routes/index')

app.use(express.json())
app.use(cors())
app.use('/api', routes)


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})