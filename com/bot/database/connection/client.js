const mongoose = require('mongoose');
const { dbPasswd, dbName, uri } = require('../../../../config.json');

const DatabaseClient = () => {
    return {
        createConnection: () => {
            if(!mongoose.connection == undefined) {
                console.log('Conexão com mongodb ja criada.')
                return;
            }
            let _uri = uri;
            _uri = _uri.replace("${dbPasswd}", dbPasswd);
            _uri = _uri.replace("${dbName}", dbName);
            mongoose.connect(_uri, { useNewUrlParser: true, useUnifiedTopology: true });
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', console.log.bind(console, 'DB connection opened.'));
        }
    };
};

module.exports = DatabaseClient;

