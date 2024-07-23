/*  File:
 *      deploy-commands-global.js
 *
 *  Description:
 *      Script; deploys commands to be used on all guilds.
 *      Must be run any time a new slash command has been created.
 * 
 *  Usage:
 *      node deploy-commands-global.js
 */

const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { clientId, guildId, token } = require("./config.json");

function getFiles(dir) {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    });
    let commandFiles = [];// Create empty array for the command files. I think we're going to have one file per command, which seems silly but whatever.

    for (const file of files) {
        if (file.isDirectory()) {
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`)//Call itself recursively on folders
            ]
        } else if (file.name.endsWith(".js")) {
            commandFiles.push(`${dir}/${file.name}`);
        }
    }

    return commandFiles;
}

let commands = [];
const commandFiles = getFiles("./commands");

for (const file of commandFiles) {// I think javascript "for (x of y)" is similar to python's "for x in y"
    const command = require(file);
    commands.push(command.data.toJSON());
}

const rest = new REST({version: '10' }).setToken(token);//This is another Javascript API, like discord.js.

//rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands })// There's a difference between applicationCommands and applicationGuildCommands. He kind of glossed over it. I don't know what the difference is. I think Guild is commands just for one guild, whereas the other one makes commands available globally.
//    .then(() => console.log('commands loaded successfully.'))
//    .catch(console.error);

// Updated to deploy commands to any and all guilds where the bot is available.
rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log("Successfully registered application commands to all guilds!"))
    .catch(console.error);
