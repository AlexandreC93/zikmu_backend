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
        enum: ["Comédie musicale", "Concerts", "Festival",
            "Savoirs pratiques", "Street-Dance", "Opéra", "Autre"]
    },

    file: {
        type: String
    },

    location: {
        type: String,
    },

    coordinatesObject: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },

    createdOn: {
        type: Date,

    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});

module.exports = mongoose.model('Event', eventSchema)
