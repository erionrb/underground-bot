const configRepository = require('./configRepository')();

const ConfigService = () => {
    return {
        findAll: async () => {
            let configArray = await configRepository.findAll();
            let config = {};
            configArray.forEach((configDB) => {
                for (var key in configDB) {
                    config[key] = configDB[key];
                }
            });
            if(config) {
                return JSON.parse(JSON.stringify(config).trim());
            }
            return {};
            
        }
    };
};
module.exports = ConfigService;