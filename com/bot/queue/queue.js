const mongoose = require('mongoose');
const music = require('../music/music');
const QueueSchema = new mongoose.Schema({
    id: String,
    play: music,
    next: [music]
});

const Music = mongoose.model('Music', QueueSchema);
module.exports = Music;