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
 * Sends the user a message notifying them of no search results being found
 * 
 * @param message 
 */
function notifyNoResults(message) {
    message.reply('Sorry, no results found');
}

/**
 * Reply to the user with any results found 
 * 
 * @param {*} message 
 * @param {*} results 
 */
function returnSearchResults(message, results) {
    let messageText = 'Here\'s what I found \n';

    results.forEach(result => {
        messageText += `${result.name}: ${result.link} \n`;
    });

    message.reply(messageText);
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
        const results = spreadsheetManager.methods.search(command);
        
        results.length ? returnSearchResults(msg, results) : notifyNoResults(msg);
    }    
});

client.login(discordAuth.token);