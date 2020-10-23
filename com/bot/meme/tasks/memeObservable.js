const taskArray = new Array();

const MemeObservable = () => {
    return {
        subscribe: (taskFunction) => taskArray.push(taskFunction),
        notifyAll: (command) => {
            console.log('MemeObservable.notifyAll: Notificando todos memes');
            taskArray.forEach(taskFunction => {
                taskFunction(command);
            });
        }
    };
};

module.exports = MemeObservable;