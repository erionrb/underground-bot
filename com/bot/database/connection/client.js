const mongoose = require('mongoose');
const { dbPasswd, dbName } = require('../../../../config.json');
const uri = `mongodb+srv://erion:${dbPasswd}@cluster0.pxjet.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const DatabaseClient = () => {
    return {
        createConnection: () => {
            if(!mongoose.connection == undefined) {
                console.log('Conexão com mongodb ja criada.')
                return;
            }
            mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', console.log.bind(console, 'DB connection opened.'));
        }
    };
};

module.exports = DatabaseClient;

