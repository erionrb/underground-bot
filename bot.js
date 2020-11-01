const Discord = require('discord.js');
const client = new Discord.Client();
const botTask = require('./com/bot/common/botTask')();
const configService = require('./com/bot/config/configService')();
const https = require('https');
const htmlParser = require('node-html-parser');
let Config = {};

client.once("ready", () => {
    console.log("Ready!");
});

client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});

client.on('message', async message => {
    if (!message.content.startsWith(Config.prefix)) {
        return;
    }

	if (message.member.voice.channel) {
        botTask.execute(message);
    } else {
        message.reply('Conecta no channel primeiro maluco!');
    }
});

client.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

async function init() {
    await load();
    login();
}

async function load() {
    console.log("bot.init() => Recuperando configuracoes...");
    let getConfig = async () => configService.findAll();
    Config = await getConfig();
}

function login() {
    client.login(Config.token);
}

//init();

var options = {
    host: 'www.yt-download.org',
    //port: 80,
    path: '/api/button/mp3/wY5l0ircwsQ'
};
  
let data = "";
let _url = '';
https.get(options, function(res) {
    // initialize the container for our data

    // this event fires many times, each time collecting another piece of the response
    res.on("data", function (chunk) {
        // append this chunk to our growing `data` var
        data += chunk;
        const root = htmlParser.parse(data);
        let a_element = '' + root.querySelectorAll('a')[0];
        a_element = htmlParser.parse(a_element);
        let url = ''+ a_element.toString().split('href=')[1];
        url = url.split(' ')[0]
        url = url.replace('"', '');
        url = url.replace('"', '');
        console.log("mp3 dowload => " + url);
        _url = url;
    });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});






