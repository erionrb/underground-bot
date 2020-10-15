const { TextChannel } = require('discord.js');
const ytdl = require('ytdl-core');
const musicQueue = require('../common/musicQueue')();
const queueService = require('./queueService');

const getInfo = (video, message) => {
    return new Promise((resolve, reject) => {
        let obj = {};

        ytdl.getInfo(video, {}, async (err, info) => {
            if (err) console.log(err);

            let format = await ytdl.chooseFormat(info.formats, { quality: 'highest' });

            if (format) {
                obj = { url: format.url, thumbnail: info.thumbnail, title: info.videoDetails.title };
            }
            resolve(obj);
        });
    })
    .catch(error => {
        message.reply('Cara tem algo errado com seu comando bicho!');
        console.error('Falha ao tentar tocar musica:', error);
    });
}

const play = async (music, message) => {
    let info = await getInfo(music, message);
    const voiceChannel = message.member.voice.channel;
    
    const connection = await voiceChannel.join();
    const stream = ytdl(music, { filter: 'audioonly' });
    const dispatcher = connection.play(stream);
    dispatcher.on('finish', () => {
        message.reply('Acabei meu trampo, saindo do channel!');
        voiceChannel.leave();
    });
    message.reply(`Tocando: ${musicQueue.getInExecution().title}`);
};

const MusicSelector = () => {
    return {
        apply: (message) => {
            const content = message.content;
            if(content.includes('info')) {
                message.reply(`Tocando ${musicQueue.getInExecution().title} agora!`);
                return;
            }

            const music = content.split('toca')[1];
            if(music == null || music == undefined) {
                message.reply('Cara não encontrei essa música não!');
                return;
            }

            play(music, message);
        },
    }
};

module.exports = MusicSelector;