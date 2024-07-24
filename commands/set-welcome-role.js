/*  File:
 *      set-welcome-role.js
 *
 *  Requirements:
 *      database setup
 */
const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const Guild = require("../models/guild");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-welcome-role")
        .setDescription("Set the welcome role for the server")
        .addRoleOption(option => option
            .setName("role")
            .setDescription("Role to be assigned to new members.")
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true }); // Show a loading message as the reply

        const { options, member, guild } = interaction;

        //if (guild.ownerId !== member.id) return interaction.reply("Only the server owner can use this command");
        // ^ I will never use this, but I'm keeping it in case I have to deal with IDs in the future.

        const role = await options.getRole("role");
        const [guild_db, created] = await Guild.findOrCreate(
            {
                where: 
                { 
                    id: await interaction.guild.id
                }
            }
        ); // Search the database, or create it if it doesn't exist.

        // Add an item to the database.
        if (!role) {
            await guild_db.update({ welcomeRoleId: null });
            interaction.editReply(`Welcome role has been disabled.`);
        }
        else {
            await guild_db.update({ welcomeRoleId: role.id });
            interaction.editReply(`Welcome role has been set to ${role}`);
        }
    }
}
