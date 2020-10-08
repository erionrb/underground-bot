
var musicaMap = {
    "rocheda" : "https://siasky.net/AABpFCxxI2x1Vl-tDgYBs-YxHK2aQj4Q5-aCMeZpdF7JMA",
    "ta rocheda" : "https://siasky.net/AABpFCxxI2x1Vl-tDgYBs-YxHK2aQj4Q5-aCMeZpdF7JMA",
    "ta-rocheda" : "https://siasky.net/AABpFCxxI2x1Vl-tDgYBs-YxHK2aQj4Q5-aCMeZpdF7JMA"
};

module.exports.select = (phrase) => {
    for(var key in musicaMap) {
        if(phrase.includes(key)) {
            console.log(`Musica encontrada para chave[${key}]`);
            return musicaMap[key];
        }
    }
    console.log("Não encontrou musica, tocando default!")
    return "https://siasky.net/AABpFCxxI2x1Vl-tDgYBs-YxHK2aQj4Q5-aCMeZpdF7JMA";
};