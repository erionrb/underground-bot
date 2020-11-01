const splitToCommandArray = (message)  => { 
    let _message = message.split(" ");
    _message[0] = _message[0].substring(1);
    return _message; 
};

const createCommand = (commandArray) => { 
    if(commandArray == null || commandArray.length == 0) {
        return {};
    }
    
    let command = {};
    if(commandArray.length == 2) {
        command[commandArray[0]] = commandArray[1];
        return command;
    }
    
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
            console.log(`Command => ${JSON.stringify(command)}`);
            command.message = message;
            return command;
        }
    };
};

module.exports = TaskMessageBuilder;