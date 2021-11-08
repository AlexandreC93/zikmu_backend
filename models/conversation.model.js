const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema({

    members: {
        type: [String],
    }

});

module.exports = mongoose.model('Conversation', conversationSchema)
