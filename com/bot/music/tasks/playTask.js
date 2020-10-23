const musicObservable = require('./musicObservable')();
const queueService = require('../../queue/queueService')();
const ytdl = require('ytdl-core');
let execution = null;

async function addToQueue(command) {
    let message = command.message;
    let music = {
        name: 'Musica Qualquer',
        link: ''+command.toca,
        type: 'youtube'
    };

    await queueService.addToQueue(music);
    if(execution == null) {
        start(message);
    }
};

async function start(message) {

    if(execution != null) {
        console.log('Cancelando start, ja existe uma musica em execucao');
        return;
    }

    let _music = await queueService.getNext();
    
    if(_music.link == 'null') {
        console.log('PlayTask.startMusic()=> Musicas encerradas...')
        return;
    }

    console.log('Musica recuperada para execucao -> ' + JSON.stringify(_music));
    const voiceChannel = message.member.voice.channel;
    const connection = await voiceChannel.join();
    const stream = ytdl(_music.link);
    const dispatcher = connection.play(stream);

    dispatcher.on('start', () => {
        console.log('PlayTask.dispatcher.start()=> Colocando id da musica para execucao...');
        execution = _music.id;
    });
    dispatcher.on('finish', () => {
        console.log('PlayTask.dispatcher.finish()=> Removendo id da musica em execucao...');
        execution = null;
        start(message);
    });
}

function musicQueueSchedueler() {
    setTimeout(async () => { 
        console.log('PlayTask.musicQueueSchedueler()=> Verificando musicas da fila...');
        let music = await queueService.getNext();
        if(music.link == 'null') {
            console.log('PlayTask.musicQueueSchedueler()=> Cancelando play...');
            musicQueueSchedueler();
        } else {
            console.log(JSON.stringify(music));
            console.log('PlayTask.musicQueueSchedueler()=> Debochando legal');
        }
    }, 2000);
}

const play = async (command) => {
    if(command.toca == undefined) {
        return;
    }
    try {
        addToQueue(command);
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
//musicQueueSchedueler();
module.exports = PlayTask;
   