require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    local: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'dohs',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
    },
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'database_dev',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
    },
    test: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'dohs',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'database',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
    }
};
