const ytdl = require('ytdl-core');
const musicObservable = require('./musicObservable');

const info = (command) => {

    if(command.info == undefined) {
        return;
    }

    let music = command.toca;
    let message = command.message;

    return new Promise((resolve, reject) => {
        let obj = {};

        ytdl.getInfo(music, {}, async (err, info) => {
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


module.exports.InfoTask = () => {
    musicObservable.subscribe(info);
};