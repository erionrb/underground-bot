const musicObservable = require('../music/tasks/musicObservable')();
const musicSubscribe = require('../music/tasks/musicSubscribe')();
const memeObservable = require('../meme/tasks/memeObservable')();
const memeSubscribe = require('../meme/tasks/memeSubscribe')();
const taskMessageBuilder = require('../common/taskMessageBuilder')();

const NOT_FOUND_TASK = () => {
    return {
        notifyAll: (command) => {
            command.message.reply('Cara você ta loco das idéias, manda alguma chave correta.');
        }
    };
};
const taskMap = {
    'toca': memeObservable,//musicObservable,
    'meme': memeObservable,
    'NOT_FOUND' : NOT_FOUND_TASK
};

const findObservable = (command) => {
    let content = command.message.content;
    for(let key in taskMap) {
        if(content.includes(key)) {
            return taskMap[key];    
        }
    }
    return taskMap.NOT_FOUND;
};

const BotTask = () => {
    musicSubscribe.init();
    memeSubscribe.init();
    return {
        execute: (message) => {
            const command = taskMessageBuilder.build(message);
            const observable = findObservable(command);
            observable.notifyAll(command);
        }
    }
};

module.exports = BotTask;