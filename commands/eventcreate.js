const { SlashCommandBuilder, GuildScheduledEventManager, GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType, PermissionFlagsBits } = require('discord.js');
const { token, guildId, clientId } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("eventcreate")
        .setDescription('Gets an event')
        .setDefaultMemberPermissions(PermissionFlagsBits.CreateEvents),// I wanted to restrict this command to users

    async execute(interaction){// async = lines in this function might not happen in order.
        const guild = await interaction.client.guilds.cache.get(guildId); // We need the guild OBJECT, not the ID, for the next step.

        if (!guild) {
            return console.log("ERROR: Guild not found!");
        }
        
        const event_manager = new GuildScheduledEventManager(guild);
        
        const startDate = new Date("2024-08-01T08:00:00.000Z");
        const endDate = new Date("2024-08-01T09:00:00.000Z");

        await event_manager.create({
            name: 'Test Event',
            scheduledStartTime: startDate,
            scheduledEndTime: endDate,
            privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
            entityType: GuildScheduledEventEntityType.Voice,
            description: 'This is a test Scheduled Event',
            channel: '1219786559302140030',
            image: null,
            reason: 'Testing with creating a Scheduled Event',
        });

        interaction.reply("All done");
    }
}// Stuff in the brackets is treated as JSON.
