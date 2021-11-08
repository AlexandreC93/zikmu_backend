const { TooManyRequests } = require('http-errors');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    songs: {
        type: [String]
    }
});

module.exports = mongoose.model('Category', categorySchema)
