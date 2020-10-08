let musicSelector = require('../music/selector');
let memeSelector = require('../meme/selector');
const MusicSelector = musicSelector();
const MemeSelector = memeSelector();

const BotTask = () => {
    return {
        select: (content) => {
            if(content.includes('toca')) {
                return MusicSelector.apply(content);
            } else if (content.includes('meme')) {
                return MemeSelector.apply(content);
            }
            return { type: 'ERROR', message: 'Cara você ta loco das idéias, manda alguma chave correta.' };
        }
    }
};

module.exports = BotTask;