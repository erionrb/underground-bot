const musicObservable = require('./musicObservable')();
const ytdl = require('ytdl-core');

const startEvent  = () => {
    message.reply(`Tocando: ${musicQueue.getInExecution().title}`);
};
const finishEvent = (voiceChannel) => {
    voiceChannel.leave();
};

const play = async (command) => {
    if(command.toca == undefined) {
        return;
    }
    let music = command.toca;
    let message = command.message;
    //let info = await infoTask.info(music, message);

    try {
        const voiceChannel = message.member.voice.channel;
        const connection = await voiceChannel.join();
        const stream = ytdl(music);
        const dispatcher = connection.play(stream);
        dispatcher.on('start', () => {});
        dispatcher.on('finish', () => voiceChannel.leave());
    } catch(error) {
        message.reply('Na boa cara, manda uma musica que exista! (╯°□°）╯︵ ┻━┻');
        console.log(error); 
    }
    
};

const PlayTask = () => {
    return {
        init: () => {
            musicObservable.subscribe(play);
        },
    };
};

module.exports = PlayTask;
   