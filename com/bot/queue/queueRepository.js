const databaseClient = require('../database/connection/client')();
const Queue = require('./queue');

const logExecution = (message, object) => {
    console.log(`${message} => ${JSON.stringify(object)}`);
};

const QueueRepository = () => {
    return {
        addToQueue : async (queue) => {
            databaseClient.createConnection();
            queue.save().then(logExecution('Musica jogada para fila', queue.play));
        },

        getQueue : async () => {
            databaseClient.createConnection();
            return await Queue.model.find({}).exec();
        },

        delete: async (queue) => {
            let _id = queue.id;
            databaseClient.createConnection();
            return Queue.model.deleteOne({id: _id}).exec();
        }
    };
};
module.exports = QueueRepository;