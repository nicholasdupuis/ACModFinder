// Dependencies
const Discord = require('discord.js');
const fs = require('fs');

// Variables
const discordAuth = require('../cfg/auth.json')
const googleAuth = require('../cfg/google-auth.json');
const spreadsheetManager = require('../bot/spreadsheet-manager');
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
 * When bot is ready, start loading spreadsheet info so it's available to search through
 */
client.on('ready', () => {
    console.log('Logged in!');
    spreadsheetManager.methods.loadSpreadsheetInfo();
});

/**
 * Main bot command syntax is !find [track/car] [searchTerm]
 */
client.on('message', msg => {
    if (msg.content.indexOf('!find') >= 0) {
        const command = parseCommand(msg.content);
        const row = spreadsheetManager.methods.searchForTrack(command.searchTerm);
        
        msg.reply(`${row.trackName}: ${row.link}`)
    }    
});

client.login(discordAuth.token);