var memeMap = {
    "pele" : "https://siasky.net/nABAy-1qKD0hd5AaEXBqZxlu3Fx_q2Y4-e4Da-1QfhadhQ"
};

const MemeSelector = () => {
    return {
        apply: (content) => {
            console.log("Vai vir meme maluco!");
            for(var key in memeMap) {
                if(content.includes(key)) {
                    return { type: 'SUCCESS', payload: memeMap[key] };
                }
            }
            return { type: 'SUCCESS', payload: "https://siasky.net/nABAy-1qKD0hd5AaEXBqZxlu3Fx_q2Y4-e4Da-1QfhadhQ"};
        },
    }
};

module.exports = MemeSelector;