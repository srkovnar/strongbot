//console.log("Hello, world!");

const { Client, Events, GatewayIntentBits, SlashCommandBuilder } = require('discord.js')
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] }); 

// Guilds = discord servers
// Client = the bot
// Recommend turning on "Developer Mode" in Discord. Go to Settings > Advanced > Developer Mode and turn it on.
// For example, that's how you get the ability to copy a server's ID.

client.once(Events.ClientReady, c =>{
    console.log(`Logged in as ${c.user.tag}`);

    const ping = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with "Pong!"')
    const hello = new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies to you with your name')
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("User to say 'hi' to")
                .setRequired(false)
            )
    const echo = new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Repeats a string')
        .addStringOption(option =>
            option
                .setName("string")
                .setDescription("String to be repeated")
                .setRequired(true)
            )

    client.application.commands.create(ping, "1219786559302140025"); //That's the guild ID. We only want this command in this one guild.
    client.application.commands.create(hello, "1219786559302140025");
    client.application.commands.create(echo, "1219786559302140025");
})

client.on(Events.InteractionCreate, interaction => {
    if(!interaction.isChatInputCommand()) return; //Make sure the interaction is a chat command.
    if(interaction.commandName === "ping"){
        interaction.reply("Pong!");
    }
    else if(interaction.commandName === "hello"){
        let user = interaction.options.getUser('user');
        if(!user) user = interaction.user
        interaction.reply(`Hello, ${user.username}!`)
    }
    else if(interaction.commandName === "echo"){
        let text = interaction.options.getString('string');
        interaction.reply(text)
    }
    console.log(interaction);
})

client.login(token);