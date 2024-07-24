/*  File:
 *      set-welcome-channel.js
 *
 *  Requirements:
 *      database setup
 */
const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const Guild = require("../models/guild");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-welcome-channel")
        .setDescription("Set the welcome channel for the server for welcome messages")
        .addChannelOption(option => option
            .setName("channel")
            .setDescription("Channel to send the welcome message")
            .addChannelTypes(ChannelType.GuildText)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true }); // Show a loading message as the reply

        const { options, member, guild } = interaction;

        //if (guild.ownerId !== member.id) return interaction.reply("Only the server owner can use this command");
        // ^ I will never use this, but I'm keeping it in case I have to deal with IDs in the future.

        const channel = await options.getChannel("channel");
        const [guild_db, created] = await Guild.findOrCreate(
            {
                where: 
                { 
                    id: await interaction.guild.id
                }
            }
        ); // Search the database, or create it if it doesn't exist.

        // Add an item to the database.
        if (!channel) {
            await guild_db.update({ welcomeChannelId: null });
            interaction.editReply(`Welcome channel has been disabled.`);
        }
        else {
            await guild_db.update({ welcomeChannelId: channel.id });
            interaction.editReply(`Welcome channel has been set to ${channel}`);
        }
    }
}
