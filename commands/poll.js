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
            .setDescription("A description for your poll that will appear directly under the title.")
            .setMaxLength(50)
        )
    ,

    async execute(interaction) {
        await interaction.deferReply({ephemeral: true});// idk what this does.

        const { user, guild, channel } = await interaction;
        const options = await interaction.options.data;

        const emoji_stupid_ugly_array = [
            "1️⃣",
            "2️⃣",
            "3️⃣",
            "4️⃣",
            "5️⃣"
        ]//WHY IS THIS THE ONLY WAY THAT WORKS. THAT'S SO STUPID.

        let emoji_structure = [
            {name: "one",   index: 0,   emoji: "1️⃣", argname: "option1" },
            {name: "two",   index: 1,   emoji: "2️⃣", argname: "option2" },
            {name: "three", index: 2,   emoji: "3️⃣", argname: "option3" },
            {name: "four",  index: 3,   emoji: "4️⃣", argname: "option4" },
            {name: "five",  index: 4,   emoji: "5️⃣", argname: "option5" }
        ]
        /*  This is set to non-constant because at some point I would like to introduce
        *   the ability to set custom poll reactions as command arguments.
        *
        *   I would also like to pair these emojis directly with the argument name
        *   (option1, option2, etc.) instead of the index in the array.
        *   That's why the "argname" field exists, despite the fact that it is unused.
        */

        let embed = new EmbedBuilder() // Still don't understand const vs let
            .setTitle("Poll")
            .setColor("Red")
        ;

        for (let i = 0; i < (options.length); i++) {
            //let emoji = emojis[i];
            let emoji_entry = emoji_structure.find(target => target.index === i);
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
                        //name: `${emoji} - ${option.value}`,
                        name: `${emoji_entry.emoji} - ${option.value}`,
                        value: " "
                    }
                );
            }
        }

        const message = await channel.send({embeds: [embed]});

        //console.log(`HERE IS THE EMOJI STRUCTURE: ${message.guild.emojis.cache}`);

        for (let k = 0; k < (options.length); k++) {
            let option = options[k];
            //let class_emoji = new Emoji(client, "one");
            if ((option.name != "title") && (option.name != "description"))
            {
                /* This was my original implementation of creating the reaction emojis. */
                //message.react(emoji_stupid_ugly_array[k]);

                /* I tried a lot of things to make this cleaner,
                *  but I had difficulty finding any way to target an emoji by its name.
                *  I eventually settled on creating a structure to hold the reaciton emojis.
                *  That implementation is shown below.
                */
                let emoji_entry = emoji_structure.find(target => target.index === k);
                message.react(emoji_entry.emoji);
            }
        }

        await interaction.editReply({content: 'sent poll successfully'}); // Done deferring
    }
}
