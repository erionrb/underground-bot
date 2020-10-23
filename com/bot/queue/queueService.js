const queueRepository = require('./queueRepository')();
const Music = require('../music/music');
const Queue = require('./queue');
const { v4: uuidv4 } = require('uuid');

const QueueService = () => {
    return {
        addToQueue: async (_music) => {
            const music = new Music.model(_music);
            let queue = new Queue.model({
                id: uuidv4(),
                play: music
            });
            console.log('QueueService.addToQueue() => Adicionando Musica na fila ' + JSON.stringify(music));
            await queueRepository.addToQueue(queue);
        },

        getQueue: async () => {
           return await queueRepository.getQueue();
        },

        getNext: async () => {
            console.log('QueueService.getNext()=> Recuperando proxima musica...');
            let queue = await queueRepository.getQueue();
            if(queue.length == 0) {
                let emptyQueue = { title: 'null', link: 'null', type: 'null'};
                console.log('QueueService.getNext()=> Cancelando execucao nao existem musicas ainda...');
                console.log('QueueService.getNext()=> empty queue['+JSON.stringify(emptyQueue)+']');
                return emptyQueue;
            }
            let next = queue[0];
            console.log('QueueService.getNext()=> Musica recuperada...' + next.play);
            QueueService().delete(next);
            return next.play;
        },

        delete: (queue) => {
            queueRepository.delete(queue);
        }
    };
};
module.exports = QueueService;