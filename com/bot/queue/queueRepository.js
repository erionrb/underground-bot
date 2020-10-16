const databaseClient = require('../database/connection/client');
const Music = require('../music/music');
const Queue = require('./queue');

const filter = { id: 'QUEUE-DEFAULT'};

const logExecution = (message, object) => {
    console.log(`${message} => ${JSON.stringify(object)}`);
};

const QueueRepository = () => {
    return {
        addToQueue : async (music) => {
            let queue = await Queue.find(filter).exec();
            queue.next.push(music);
            Queue.save().then(logExecution('Musica jogada para fila', music));
        },

        addToExecution : (music)=> {
            let queue = await Queue.find(filter).exec();
            queue.play = music;
            Queue.save().then(logExecution('Musica jogada para execucao', music));
        },

        getInExecution : () => {
            let queue = await Queue.find(filter).exec();
            return queue.play;
        },

        getQueue : () => {
            return await Queue.find(filter).exec();
        }
    };
};

module.exports = QueueRepository;