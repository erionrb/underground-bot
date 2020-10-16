const queueRepository = require('./queueRepository');
const Music = require('../music/music');

module.exports.QueueService = () => {
    return {
        addToQueue: (_music) => {
            const music = new Music(_music);
            queueRepository.addToQueue(music);
        },
        
        addToExecution: (_music) => {
            const music = new Music(_music);
            queueRepository.addToExecution(music);
        },

        getInExecution: () => {
            const music = queueRepository.getInExecution();
            return { 
                name: music.name,
                link: music.link,
                type: music.type
            };
        },
        
        getQueue: () => {
            const queue = queueRepository.getQueue();
            return {

            };
        }
    };
};