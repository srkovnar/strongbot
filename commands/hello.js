const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies to you with your name')
    .addUserOption((option) =>
        option
            .setName("user")
            .setDescription("User to say 'hi' to")
            .setRequired(false)
    ),

    async execute(interaction){// async = lines in this function might not happen in order.
        let user = interaction.options.getUser('user');
        if(!user) user = interaction.user
        interaction.reply(`Hello, ${user.username}!`)
    }// Coming back to this later.
}// Stuff in the brackets is treated as JSON.
