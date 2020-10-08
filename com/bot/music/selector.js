const MusicSelector = () => {
    return {
        apply: (content) => {
            if(content.includes("toca")) {
                console.log("Vai vir musica maluco!");
                return { type: 'SUCCESS',  payload: 'https://siasky.net/AABpFCxxI2x1Vl-tDgYBs-YxHK2aQj4Q5-aCMeZpdF7JMA'};
            }
            return youtubeApply(content);
        },
        
        youtubeApply: (content) => {
            if(content.includes("youtube")) {
                console.log("Vai vir youtube maluco!");
                return { type: 'SUCCESS',  payload: ''};
            }
            return spotifyApply(content);
        },
        
        spotifyApply: (content) => {
            if(content.includes("spotify")) {
                console.log("Vai vir youtube maluco!");
                return { type: 'SUCCESS',  payload: ''};
            }
            return { type: 'ERROR', message: 'Cara você ta loco das idéias, manda alguma chave correta.' };
        }
    }
};

module.exports = MusicSelector;