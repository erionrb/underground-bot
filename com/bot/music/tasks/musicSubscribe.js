const playTask = require('./playTask')();

const MusicSubscribe = () => {
    return {
        init: () => {
           playTask.init();
        }
    };
};

module.exports = MusicSubscribe;