const repository = require('./queueRepository');

module.exports.QueueService = () => {
    return {
        addToQueue: (music) => {
            repository.addToQueue(music);
        },
        
        addToExecution: (music) => {
            repository.addToExecution(music);
        },

        makeCurrentExecuted: () => {
            repository.makeCurrentExecuted();
        },

        getInExecution: () => {
            return repository.getInExecution();
        },
        
        getQueue: () => {
            return repository.getQueue();
        },

        getExecuted: () => {
            return repository.getExecuted();
        }
    };
};