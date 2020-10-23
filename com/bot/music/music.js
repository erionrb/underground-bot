const mongoose = require('mongoose');
const MusicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }, 
    link: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
});

const Music = {
    schema: MusicSchema,
    model: mongoose.model('Music', MusicSchema)
};
module.exports = Music;