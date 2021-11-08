const { TooManyRequests } = require('http-errors');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const postCatSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    posts: {
        type: [String]
    }
});

module.exports = mongoose.model('Post_Category', postCatSchema)
