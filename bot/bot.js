// Dependencies
const Discord = require('discord.js');
const fs = require('fs');

// Variables
const discordAuth = require('../cfg/auth.json')
const googleAuth = require('../cfg/google-auth.json');
const client = new Discord.Client();

/**
 * Returns an object corresponding to the command given by the user.
 * Object contains the command, mod type, and search term.
 * 
 * @param message - the string containing the command given by the user
 */
function parseCommand(message) {
    const command = message.split(' ');
    const modType = command[1];
    const searchTerm = command.slice(2).join(' ');

    return {
        modType: modType,
        searchTerm: searchTerm
    };
}

/**
 * Runs when bot is ready
 */
client.on('ready', () => {
    console.log('Logged in!')
});

/**
 * Main bot command is !find [track/car] [searchTerm]
 */
client.on('message', msg => {
    if (msg.content.indexOf('!find') >= 0) {
        const command = parseCommand(msg.content);
        console.log(command);
    }
});

client.login(discordAuth.token);