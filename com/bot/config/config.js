const mongoose = require('mongoose');
const ConfigSchema = new mongoose.Schema({
    id: String,
    name: String,
    value: String
});

const Config = {
    model: mongoose.model('Config', ConfigSchema),
    schema: ConfigSchema
};

module.exports = Config;