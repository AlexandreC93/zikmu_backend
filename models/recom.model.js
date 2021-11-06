const { TooManyRequests } = require('http-errors');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
    },
    user_id: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model('Category', categorySchema)
