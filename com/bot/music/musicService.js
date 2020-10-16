
const MusicService = () => {

    const commandMap = {
        play: this.play
    };

    const play = (command) => {
        // tocar musica
    };

    const transform = (command) => {
        // transformar o objeto command em uma action correta
    };

    return {
        execute: (command) => {
            if(!command.content.includes('toca')) {
                return;
            }
            let action = transform(command);
            action.execute();
        }
    }
};
module.exports = MusicService;