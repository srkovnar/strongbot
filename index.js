//console.log("Hello, world!");

const Discord = require('discord.js');
//const {Client, Intents} = require('discord.js');
const { Client, Events, GatewayIntentBits, SlashCommandBuilder, Collection, Intents } = require('discord.js')
const { token, guildID } = require('./config.json');
const fs = require('node:fs');

const path = require('node:path');

//const client = new Client({ intents: [GatewayIntentBits.Guilds] }); 
const client = new Client({ intents: [GatewayIntentBits.Guilds] | [GatewayIntentBits.GuildMembers] | [GatewayIntentBits.MessageContent] | [GatewayIntentBits.GuildMessages] }); 

// Guilds = discord servers
// Client = the bot
// Recommend turning on "Developer Mode" in Discord. Go to Settings > Advanced > Developer Mode and turn it on.
// For example, that's how you get the ability to copy a server's ID.

/* load commands */
client.commands = getCommands('./commands')

client.once(Events.ClientReady, c =>{
     console.log(`Logged in as ${c.user.tag}`);
 
     //const ping = new SlashCommandBuilder()
     //    .setName('ping')
     //    .setDescription('Replies with "Pong!"')
     //const hello = new SlashCommandBuilder()
     //    .setName('hello')
     //    .setDescription('Replies to you with your name')
     //    .addUserOption(option =>
     //        option
     //            .setName("user")
     //            .setDescription("User to say 'hi' to")
     //            .setRequired(false)
     //        )
     //const echo = new SlashCommandBuilder()
     //    .setName('echo')
     //    .setDescription('Repeats a string')
     //    .addStringOption(option =>
     //        option
     //            .setName("string")
     //            .setDescription("String to be repeated")
     //            .setRequired(true)
     //        )
 
     //client.application.commands.create(ping, "1219786559302140025"); //That's the guild ID. We only want this command in this one guild.
     //client.application.commands.create(hello, "1219786559302140025");
     //client.application.commands.create(echo, "1219786559302140025");
 })

// Episode 5 is about splitting events off into their own folders. I think that's unnecessary. So I'm skipping for now.

//client.on(Events.InteractionCreate, interaction => {
client.on(Events.InteractionCreate, interaction => {
    if(!interaction.isChatInputCommand()) return; //Make sure the interaction is a chat command.
    //if(interaction.commandName === "ping"){
    //    interaction.reply("Pong!");
    //}
    //else if(interaction.commandName === "hello"){
    //    let user = interaction.options.getUser('user');
    //    if(!user) user = interaction.user
    //    interaction.reply(`Hello, ${user.username}!`)
    //}
    //else if(interaction.commandName === "echo"){
    //    let text = interaction.options.getString('string');
    //    interaction.reply(text)
    //}

    // Above lines have been moved into their own files for better flexibility. All command files (commands folder) will contain their own interaction functions.

    let command = client.commands.get(interaction.commandName); // This is how you get stuff from arrays, like our commands array.

    try {
        if (interaction.replied) return;// What is this for?
        command.execute(interaction);
    }
    catch (error) {
        console.error(error);
    }

    //console.log(interaction);
    // ^ This is probably good practice, but this is too noisy for me personally.
});




// const Guild = require("./models/guild");
// 
// client.on(Events.GuildMemberAdd, member => {
//     // member = instance of a user within a guild (server)
//     console.log(`Sending welcome message to user ${member.user}`);
//     //const welcomeRole = member.guild.roles.cache.find(role => role.name === 'member');// Could also specify ID instead of name. Can I use this elsewhere?
//     //member.roles.add(welcomeRole);
// 
//     // const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'general');
//     // welcomeChannel.fetch();
//     // welcomeChannel.send(`Hey there, ${member.user}`);
// 
//     // New method of doing welcome message
//     // See also: guild.js, set-welcome-channel.js
//     console.log(`Looking for an entry with guild ID ${member.guild.id}`);
//     const guild_db = Guild.findOne({ where: { id: member.guild.id}});
// 
//     if (!guild_db) {
//         console.log("Couldn't find an entry for this guild in the welcome database.");
//     }
//     else {
//         console.log("Found an entry for this guild ID.");
//         console.log(`${guild_db}`);
//         console.log(`id: ${guild_db.id}`);
//         console.log(`welcomeChannelId: ${guild_db.welcomeChannelId}`);
//         console.log(`welcomeRoleId: ${guild_db.welcomeRoleId}`);
//         console.log(`createdAt: ${guild_db.createdAt}`);
//     }
// 
//     if (guild_db.welcomeChannelId) {
//         console.log("Welcome channel exists");
//         const welcomeChannel = member.guild.channels.fetch(guild_db.welcomeChannelId);
//         welcomeChannel.send(`Welcome ${member.user} to the server!`);
//     }
//     else {
//         console.log("Welcome channel has not been set yet.");
//     }
// });

const eventsPath = path.join(__dirname, "events");
eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);

// Search a directory and turn all .js files into a command collection.
function getCommands(dir) {
    let commands = new Discord.Collection();
    const commandFiles = getFiles(dir);

    // Package each of our command files into a nice little command object in a nice little commands collection.
    for (commandFile of commandFiles) {
        const command = require(commandFile);
        const command_data = command.data.toJSON();
        commands.set(command.data.toJSON().name, command);
    }

    return commands;
}


// Quoth Episode 4: "It would be better to put this in its own file, in its own 'utilities' folder. But for now we leave it here."
function getFiles(dir) {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    });
    let myFiles = [];

    for (const file of files) {
        if (file.isDirectory()) {
            myFiles = [
                ...myFiles,
                ...getFiles(`${dir}/${file.name}`)//Call itself recursively on folders
            ]
        } else if (file.name.endsWith(".js")) {
            myFiles.push(`${dir}/${file.name}`);
        }
    }

    return myFiles;
}
