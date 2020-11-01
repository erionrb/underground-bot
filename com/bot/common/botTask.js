const musicObservable = require('../music/tasks/musicObservable')();
const musicSubscribe = require('../music/tasks/musicSubscribe')();
const memeObservable = require('../meme/tasks/memeObservable')();
const memeSubscribe = require('../meme/tasks/memeSubscribe')();
const taskMessageBuilder = require('../common/taskMessageBuilder')();

const AUTO_RESPONSE = [
    'Venha comigo se você quiser viver.',
    'Eu voltarei.',
    'Eu preciso de suas roupas, suas botas e sua motocicleta.',
    'Cai fora.',
    'Sou... Velho. Não obsoleto.',
    'Hasta la vista, baby.'
];

const NOT_FOUND_TASK = () => {
    return {
        notifyAll: (command) => {
            command.message.reply(`Você errou o comando mas... ${getAutoResponse()}`);
        }
    };
};
const taskMap = {
    'toca': musicObservable,
    'meme': memeObservable,
    'NOT_FOUND' : NOT_FOUND_TASK
};

const findObservable = (command) => {
    let content = command.message.content;
    for(let key in taskMap) {
        if(content.includes(key)) {
            console.log(`Found task => ${key}`);
            return taskMap[key];    
        }
    }
    console.log(`Found task => ${taskMap.NOT_FOUND}`);
    return taskMap.NOT_FOUND();
};

const getAutoResponse = () => {
    let arraySize = AUTO_RESPONSE.length;
    let index = Math.floor(Math.random() * arraySize);
    return AUTO_RESPONSE[index];
};

const BotTask = () => {
    musicSubscribe.init();
    memeSubscribe.init();
    return {
        execute: (message) => {
            const command = taskMessageBuilder.build(message);
            console.log(JSON.stringify(command));
            const observable = findObservable(command);
            observable.notifyAll(command);
        }
    }
};

module.exports = BotTask;