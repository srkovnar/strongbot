/* EVENT: Member Join Event
 * 
 * Sending welcome messages and managing welcome roles requires you 
 * to go into the Discord Developer Portal and activate the following
 * for your bot:
 * - Presence Intent
 * - Server Members Intent
 * - Message Content Intent
 * 
 * This implementation makes use of a database.
 * 
 * This implementation is intended to be used with commands for setting
 * a welcome channel and welcome role, i.e. set-welcome-channel.js and
 * set-welcome-role.js.
 */

const Guild = require("../models/guild");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        console.log("EVENT: guildMemberAdd event");
        console.log(`Looking for a guild with ID ${member.guild.id}`);

        /* Poll database */
        const guild_db = await Guild.findOne({where: {id: member.guild.id}});
        
        if (!guild_db) {
            console.log("Couldn't find an entry for this guild in the welcome database.");
        }
        else {
            console.log("Found an entry for this guild ID.");
        }

        /* Assign welcome role, if available */
        if (guild_db.welcomeRoleId) {
            const welcomeRole = await member.guild.roles.fetch(guild_db.welcomeRoleId);
            await member.roles.add(welcomeRole);
            console.log("Asigning welcome role.");
        }
        // else {
        //     console.log("No welcome role set; skipping role assignment...");
        // }

        /* Send welcome message, if available */
        if (guild_db.welcomeChannelId) {
            const welcomeChannel = await member.guild.channels.fetch(guild_db.welcomeChannelId);
            await welcomeChannel.send(`Welcome to the server ${member.user}`);
            console.log("Sending welcome message.");
        }
        // else {
        //     console.log("No welcome channel set; skipping welcome message...");
        // }
    }
}
