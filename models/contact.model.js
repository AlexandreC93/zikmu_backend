const { TooManyRequests } = require('http-errors');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({

    email: {
        type: String,
        required: true
    },

    object: {
        type: String,
        required: true
    },

    file: {
        type: String
    },

    fullName: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    user_id: {
        type: Number
    }

});

module.exports = mongoose.model('Contact', contactSchema)
