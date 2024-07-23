const sequelize = require("./utils/database.js");
const Guilds = require("./models/guild.js");

// sequelize.sync({force: true});
sequelize.sync({alter: true});
// force vs alter: force resets all data to empty and makes new changes.
// only sync if you've changed the model.
// Best practice: use alter when possible.
