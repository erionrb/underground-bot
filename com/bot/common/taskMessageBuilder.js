const splitToCommandArray = (message)  => { return message.split(" ") };

const createCommand = (commandArray) => { 
    if(commandArray == null || commandArray.length == 0) {
        return {};
    }
    let command = {};
    for(let i = 1; i < (commandArray.length - 1); i++) {
        let key = commandArray[i];
        let value = commandArray[i+1];
        command[key] = value;
    }
    return command;
};

const TaskMessageBuilder = () => {
    return {
        build: (message) => {
            const commandArray = splitToCommandArray(message.content);
            const command = createCommand(commandArray);
            command.message = message;
            return command;
        }
    };
};

module.exports = TaskMessageBuilder;