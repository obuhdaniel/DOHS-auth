const { Sequelize } = require('sequelize');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'local';
const dbConfig = config[env];

const sequelize = new Sequelize('sql8720644', 'sql8720644', 'Cq5TMpL8yq', {
    host: 'sql8.freemysqlhosting.net',
    port: 3306,
    dialect: 'mysql',
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
