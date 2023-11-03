const dbConfig = require('../config/dbconfig');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
});
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.user = require('./users')(sequelize, Sequelize.DataTypes);


module.exports = db;

