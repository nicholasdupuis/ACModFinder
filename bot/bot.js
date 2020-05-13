const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in! ')
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

let rawdata = fs.readFileSync('cfg/auth.json');
let discordAuth = JSON.parse(rawdata);
client.login(discordAuth.token);