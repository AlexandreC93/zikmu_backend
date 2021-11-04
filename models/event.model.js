const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    text: {
        type: String
    },

    category: {
        type: String,
        enum: ["Rap", "Pop", "Funk"]
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

module.exports = mongoose.model('Event', eventSchema)
