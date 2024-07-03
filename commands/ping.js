// Requirements
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()// This is the bit that used to be in index.js in the client.once section.
    .setName('ping')
    .setDescription('Replies with "Pong!"'),

    async execute(interaction){// async = lines in this function might not happen in order.
        interaction.reply("Pong!");
    }// Coming back to this later.
}// Stuff in the brackets is treated as JSON.
