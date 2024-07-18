const { SlashCommandBuilder, EmbedBuilder, Emoji } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Create a poll")
        .addStringOption(option =>
            option
            .setName("option1")
            .setDescription("Option 1")
            .setMaxLength(50)
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName("option2")
            .setDescription("Option 2")
            .setMaxLength(50)
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName("option3")
            .setDescription("Option 3")
            .setMaxLength(50)
        )
        .addStringOption(option =>
            option
            .setName("option4")
            .setDescription("Option 4")
            .setMaxLength(50)
        )
        .addStringOption(option =>
            option
            .setName("option5")
            .setDescription("Option 5")
            .setMaxLength(50)
        )
        .addStringOption(option =>
            option
            .setName("title")
            .setDescription("Title of the poll")
            .setMaxLength(32)
        )
        .addStringOption(option =>
            option
            .setName("description")
            .setDescription("A description for your poll that will appear directly beneath the title.")
            .setMaxLength(50)
        )
    ,

    async execute(interaction) {
        await interaction.deferReply({ephemeral: true});// idk what this does.

        const { user, guild, channel } = await interaction;
        const options = await interaction.options.data;

        const emojis = [
            ":one:",
            ":two:",
            ":three:",
            ":four:",
            ":five:"
        ];
        const emoji_names = [
            "one",
            "two",
            "three",
            "four",
            "five"
        ]
        const emoji_stupid_ugly_array = [
            "1️⃣",
            "2️⃣",
            "3️⃣",
            "4️⃣",
            "5️⃣"
        ]//WHY IS THIS THE ONLY WAY THAT WORKS. THAT'S SO STUPID.

        let embed = new EmbedBuilder() // Still don't understand const vs let
            .setTitle("Poll")
            .setColor("Red")
        ;

        for (let i = 0; i < (options.length); i++) {
            let emoji = emojis[i];
            let option = options[i];

            if (option.name == "title") {
                embed.setTitle(option.value);
            }
            else if (option.name == "description") {
                embed.setDescription(option.value);
            }
            else {
                embed.addFields(
                    {
                        name: `${emoji} - ${option.value}`,
                        value: " "
                    }
                );
            }
        }

        const message = await channel.send({embeds: [embed]});

        for (let k = 0; k < (options.length); k++) {
            let option = options[k];
            //let class_emoji = new Emoji(client, "one");
            if ((option.name != "title") && (option.name != "description"))
            {
                let emoji = message.guild.emojis.cache.find(emoji => emoji.name === emoji_names[k]);
                //let emoji = guild.emojis.cache.find(emoji => emoji.name === "one");
                
                console.log(emoji);

                //let poo_emoji = new Emoji(interaction.client, emoji);
                // I thought maybe you're supposed to use the Emoji class. That doesn't seem to be the case.

                //message.react("one");
                //message.react(emoji);
                
                console.log(emoji_stupid_ugly_array[k].name);

                message.react(emoji_stupid_ugly_array[k]);
                //message.react(emoji);
                //message.react(emoji.id); // No, didn't work.
            }
        }

        await interaction.editReply({content: 'sent poll successfully'});
    }
}
