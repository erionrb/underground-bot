const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const client = new Discord.Client();
const botTask = require("./com/bot/common/botTask")();

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
    if (!message.content.startsWith('!bot')) {
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

client.login('NzYzMDM1MzQ2MjYxOTAxMzEy.X3x2Cw.FSSQCkXwz9rrb9AU3AJoH3j-xmY');





