const taskArray = new Array();

const MusicObservable = () => {
    return {
        subscribe: (taskFunction) => taskArray.push(taskFunction),
        notifyAll: (command) => {
            console.log('MusicObservable.notifyAll: Notificando todas musicas');
            taskArray.forEach(taskFunction => {
                taskFunction(command);
            });
        }
    };
};

module.exports = MusicObservable;