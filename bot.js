const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");
const memeSelector = require("./com/bot/meme/executor");
const musicSelector = require("./com/bot/music/executor");
const client = new Discord.Client();
let botTask = require("./com/bot/common/botTask");
const BotTask = botTask();

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
    if (!message.content.startsWith(prefix)) {
        return;
    }

	if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        await connection.play(execute(message));
    } else {
        message.channel.send('Conecta no channel primeiro maluco!');
    }
});

function execute(message) {
    let response = BotTask.select(message.content);
    if(response.type == 'ERROR') {
        message.channel.send(response.message);
    }
    return response.payload;
}

client.login(token);



