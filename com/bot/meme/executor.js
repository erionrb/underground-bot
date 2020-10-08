var memeMap = {
    "pele" : "https://siasky.net/nABAy-1qKD0hd5AaEXBqZxlu3Fx_q2Y4-e4Da-1QfhadhQ"
};

module.exports.select = (phrase) => {
    for(var key in memeMap) {
        if(phrase.includes(key)) {
            return memeMap[key];
        }
    }
    return "https://siasky.net/nABAy-1qKD0hd5AaEXBqZxlu3Fx_q2Y4-e4Da-1QfhadhQ"
};