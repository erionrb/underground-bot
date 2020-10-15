const memeObservable = require('./memeObservable')();
const MEME_PELE = 'https://siasky.net/nAD2vkkkgKqmwJcuqIl9Mv6lK2846RoJ1gnV0AjzuVeKIQ';
const MEME_EROU = 'https://siasky.net/vAFLEQAC4fl91Rn4QoV4UPElo8vfeREY-IYb6M2nDWA5IQ';

const play = async (command) => {
    if(command.meme == undefined) {
        return;
    }

    
    let meme = command.meme;
    let message = command.message;
    let memePath = MEME_PELE;
    
    if(!command.meme.includes('pele')) {
        message.reply('Na boa cara, manda um meme que exista! (╯°□°）╯︵ ┻━┻');
        memePath = MEME_EROU;
    }

    const voiceChannel = message.member.voice.channel;
    const connection = await voiceChannel.join();
    const dispatcher = connection.play(memePath);
    dispatcher.on('start', () => {});
    dispatcher.on('finish', () => voiceChannel.leave());
};

const PlayTask = () => {
    return {
        init: () => {
            memeObservable.subscribe(play);
        },
    };
};

module.exports = PlayTask;
   