const path = require('path');

module.exports = {
    development: {
        host: "localhost",
        username: null,
        password: null,
        database: "main",
        storage: path.join(__dirname, '../database', 'database.sqlite'),
        dialect: 'sqlite',
    }
};