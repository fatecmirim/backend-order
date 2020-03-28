const dotenv = require("dotenv");
const config = require("../../environment/config");
dotenv.config();

module.exports = {
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    host: config.database.host,
    dialect: config.database.dialect
};
