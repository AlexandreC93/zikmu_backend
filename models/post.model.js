const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({

    text: {
        type: String
    },

    file: {
        type: String
    },

    location: {
        type: String
    },

    createdOn: {
        type: Date,
        required: true
    },

    user_id: {
        type: Number
    }

});

module.exports = mongoose.model('Post', postSchema)
