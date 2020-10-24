const Discord = require('discord.js');
const client = new Discord.Client();
const botTask = require('./com/bot/common/botTask')();
const configService = require('./com/bot/config/configService')();
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

init();






