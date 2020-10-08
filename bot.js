const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");
const memeSelector = require("./memes/meme-executor");
const musicSelector = require("./musicas/music-executor");

const client = new Discord.Client();

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
        await connection.play(execute(message.content));
    } else {
        message.member.reply('Conecta no channel primeiro maluco!');
    }
});

function execute(content) {
    if(content.includes("toca")) {
        console.log("Vai vir musica maluco!");
        return musicSelector.select(content);
    }
    console.log("Soltando meme ai doido!");
    return memeSelector.select(content);
}

client.login(token);



