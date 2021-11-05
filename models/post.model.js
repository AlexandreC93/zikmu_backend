const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({

    text: {
        type: String,
        required: true
    },

    file: {
        type: String
    },

    location: {
        type: String
    },

    // createdOn: {
    //     type: Date,
    //     required: true
    // },

    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

});

module.exports = mongoose.model('Post', postSchema)
