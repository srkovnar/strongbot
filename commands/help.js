const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Display a help message.")
    ,
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("Help")
            .setDescription("Bot help menu")
            .setColor("Aqua") // Can use hex code, or a default color.
            .addFields(
                {
                    name: "FAQs",
                    value: "Example text",
                    inline: false
                },
                {
                    name: "More help",
                    value: "Join our support server here: fake-link",
                    inline: false
                }
            )
        ;

        await interaction.reply({
            //content:"", // Put text here
            embeds: [embed], // You can have up to 10 embeds per message
            ephemeral: true // hidden message (only the user who runs the command can see the reply
        })

    }
}
