const mongoose = require('mongoose');
const Music = require('../music/music');
const QueueSchema = new mongoose.Schema({
    id: String,
    play: Music.schema
});

const Queue = {
    model: mongoose.model('Queue', QueueSchema),
    schema: QueueSchema
};

module.exports = Queue;