const { Sequelize } = require('sequelize');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'local';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});

const User = require('./user')(sequelize, Sequelize.DataTypes);

const initDB = async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

module.exports = { initDB, User };
