const { SlashCommandBuilder, GuildScheduledEventManager, GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType, PermissionFlagsBits } = require('discord.js');
const { token, guildId, clientId } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("eventdebug")
        .setDescription('Debug command for guild scheduled events')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),// I wanted to restrict this command to users

    async execute(interaction){// async = lines in this function might not happen in order.
        const guild = await interaction.client.guilds.cache.get(guildId);

        if (!guild) {
            return console.log("ERROR: Guild not found!");
        }
        
        const event_manager = new GuildScheduledEventManager(guild);
        const old_event_manager = guild.scheduledEvents;

        console.log("===CACHE===");
        console.log(event_manager.cache);
        // ^ This returns no events because we just made a new event manager.
        // To get the list of events, we have to use the existing event manager!


        console.log(guild.channels.cache);
        //console.log(event_manager.fetch())
        console.log(event_manager.holds);
        console.log(guild.scheduledEvents.cache);

        //var guild_events = guild.GetEventsAsync();

        interaction.reply("All done");
    }
}// Stuff in the brackets is treated as JSON.
