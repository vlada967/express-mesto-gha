const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    link: {
        type: String,
        required: true
    },
    owner: {
        type: require('mongodb').ObjectId,
        required: true
    },
    likes: {
        type: [require('mongodb').ObjectId],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('card', cardSchema); 