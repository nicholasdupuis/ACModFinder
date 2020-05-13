// Dependencies
const Discord = require('discord.js');
const fs = require('fs');

// Variables
const discordAuth = require('../cfg/auth.json')
const googleAuth = require('../cfg/google-auth.json');
const client = new Discord.Client();

/**
 * Determine whether to search for a track or a car pack
 * @param msg 
 */
function parseCommand(msg) {
    const command = msg.content.split(' ');
    const modType = command[1];
    const searchTerm = ''
    let downloadLink = '';

    //TODO: Break this into another function since it's not parsing the command like the function name says
    if (modType === 'track') {
        downloadLink = getTrackLink();
    } else if (modType === 'cars') {
        downloadLink = getCarPackLink();
    }

    const response = (downloadLink ? `Download: ${downloadLink}` : 'No Download Link Found');
    msg.reply(response);
}

/**
 * Given a search term, return download link for a track
 */
function getTrackLink() {
    return 'track link';
}

/**
 * Given a search term, return download link for a car pack
 */
function getCarPackLink() {
    return 'car pack link';
}

client.on('ready', () => {
    console.log('Logged in!')
});

/**
 * Main bot command is !find [track/car] [searchTerm]
 */
client.on('message', msg => {
    if (msg.content.indexOf('!find') >= 0) {
        parseCommand(msg);
    }
});

client.login(discordAuth.token);