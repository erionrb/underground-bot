const { TextChannel } = require('discord.js');
const ytdl = require('ytdl-core');
const MusicQueue = require('../common/musicQueue')();

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

const addToQueue = (music) => {
    MusicQueue.addToExecution(music);
};

const play = async (music, message) => {
    //let info = await getInfo(music, message);
    addToQueue({ title: 'Before I Forget', link: music});
    
    const voiceChannel = message.member.voice.channel;
    
    const connection = await voiceChannel.join();
    const stream = ytdl(music, { filter: 'audioonly' });
    const dispatcher = connection.play(stream);
    dispatcher.on('finish', () => {
        message.reply('Acabei meu trampo, saindo do channel!');
        voiceChannel.leave();
    });
    message.reply(`Tocando: ${MusicQueue.getInExecution().title}`);
};

const findMusic = (music) => {
    // Encontrar o link da musica no banco de dados
    return '';
};

const MusicSelector = () => {
    return {
        apply: (message) => {
            const content = message.content;

            if(content.includes('info')) {
                message.reply(`Tocando ${MusicQueue.getInExecution().title} agora!`);
                return;
            }

            let musicStr = content.split('toca')[1];
            const music = musicStr;//findMusic(content);
            if(music == null || music == undefined) {
                message.reply('Cara não encontrei essa música não!');
                return;
            }
            play(music, message);
        },
    }
};

module.exports = MusicSelector;