/*  File:
 *      guild.js
 */

const Sequelize = require("sequelize");
const sequelize = require("../utils/database.js");

const Guild = sequelize.define("guild", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true // Cannot be null / empty
    },
    welcomeChannelId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    welcomeRoleId: {
        type: Sequelize.STRING,
        alowNull: true
    }
});

module.exports = Guild;
