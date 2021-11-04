const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    fullName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
        unique: true
    },
    birthDate: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema)
