let musicSelector = require('../music/musicSelector');
let memeSelector = require('../music/musicSelector');
const MusicSelector = musicSelector();
const MemeSelector = memeSelector();

const NOT_FOUND_TASK = () => {
    return {
        apply: (message, session) => {
            message.reply('Cara você ta loco das idéias, manda alguma chave correta.');
        }
    };
};
const taskMap = {
    'toca': MusicSelector,
    'info': MusicSelector,
    'meme': MemeSelector,
    'NOT_FOUND' : NOT_FOUND_TASK
};

const findBotTask = (content) => {
    for(let key in taskMap) {
        if(content.includes(key)) {
            return taskMap[key];    
        }
    }
    return taskMap.NOT_FOUND;
};

const BotTask = () => {
    return {
        execute: (message, session) => {
            const content = message.content;
            const task = findBotTask(content);
            task.apply(message, session);
        }
    }
};

module.exports = BotTask;