const express = require('express');
require('dotenv').config();
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const cookieParser = require("cookie-parser");
const db = require('./models')

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', routes);
app.use(express.urlencoded({ extended: true }));

(async () => {
    await db.sequelize.sync();
    console.log("All models were synchronized successfully.");
})();


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})