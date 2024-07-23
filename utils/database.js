/* Sets up the database.
 *
 * Dependencies:
 *  - sequelize
 *  - sqlite3
 */

const Sequelize = require("sequelize");

// You need to initialize the Sequelize with a name, a username, and a password (change later)
const sequelize = new Sequelize("database", "user", "password", {
    dialect: "sqlite",
    host: "localhost",// Run this locally
    storage: "database.sqlite",// Can be whatever file name you want
    logging: false
});

module.exports = sequelize;
