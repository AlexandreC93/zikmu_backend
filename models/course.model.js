const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    text: {
        type: String
    },
    
    file: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    createdOn: {
        type: Date,
        required: true
    },

    user_id: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Course', courseSchema)
