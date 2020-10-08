const mongoose = require('mongoose');
const { dbPasswd, dbName } = require('../../../../config.json');
const uri = `mongodb+srv://erion:${dbPasswd}@cluster0.pxjet.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connection opened.');
});

