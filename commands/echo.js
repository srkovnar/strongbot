const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Repeats a string')
    .addStringOption((option) =>
        option
            .setName("string")
            .setDescription("String to be repeated")
            .setRequired(true)
    ),

    async execute(interaction){// async = lines in this function might not happen in order.
        let text = interaction.options.getString('string');
        interaction.reply(text)
    }
}// Stuff in the brackets is treated as JSON.
