const fs = require('fs');
const util = require('util');
const QUEUE_PATH = 'C:/totvs/discord/app/cache/queue-file.json';
let queueFile = null;

const reloadFile = async () => {
    const readFile = util.promisify(fs.readFile);
    await readFile(QUEUE_PATH, (err, data) => {
        if (err) throw err;
        queueFile = JSON.parse(data);
        console.log('Queue Recarregada');
    });
};

const loadFile = async () => {
    if(queueFile == null) {
        reloadFile();
    }
};

const overrideFile = () => {
    let data = JSON.stringify(queueFile);
    fs.writeFileSync(QUEUE_PATH, data);
};

const commitFile = () => {
    overrideFile();
    reloadFile();
};


const MusicQueue = () => {
    return {
        addToQueue: (music) => {
            loadFile();
            queueFile.queue.push(music);
            commitFile();
        },
        
        addToExecution: (music) => {
            loadFile();
            queueFile.execution = music;
            commitFile();
        },

        makeItExecuted: () => {
            loadFile();
            let executed = getInExecution();
            queueFile.executed.push(executed);
            commitFile();
        },

        getInExecution: () => {
            loadFile();
            return queueFile.execution;
        },
        
        getQueue: () => {
            loadFile();
            return queueFile.queue;
        },

        getExecuted: () => {
            loadFile();
            return queueFile.executed;
        }
    };
};

module.exports = MusicQueue;