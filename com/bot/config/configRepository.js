const databaseClient = require('../database/connection/client')();
const Config = require('./config');

const ConfigRepository = () => {
    return {

        find: async () => {},
        
        findAll: async () => {
            databaseClient.createConnection();
            return await Config.model.find({}).exec();
        }
    };
};
module.exports = ConfigRepository;