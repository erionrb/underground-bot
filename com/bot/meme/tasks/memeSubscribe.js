const playTask = require('./playMeme')();

const MemeSubscribe = () => {
    return {
        init: () => {
           playTask.init();
        }
    };
};

module.exports = MemeSubscribe;