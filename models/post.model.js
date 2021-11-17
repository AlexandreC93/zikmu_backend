const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    //id du user qui post
    posterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    category: {
        type: String,
    },

    message: {
        type: String,
        trim: true,
        maxlength: 500
    },

    file: {
        type: String
    },

    video: {
        type: String,

    },
    likers: {
        type: [String],
        required: true,
    },
    //commentaire de post
    comments: {
        type: [
            //pour eviter plusieurs likes
            {
                postedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                commenterPseudo: String,
                text: String,
                timestamps: Number,
            }
        ],
        required: true,
    },


},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Post', postSchema)
