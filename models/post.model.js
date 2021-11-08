const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    //id du user qui post
    posterId: {
        type: String,
        required: true
    },

    message: {
        type: String,
        trim: true,
        maxlength: 500
    },

    picture: {
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
                commenterId: String,
                commenterPseudo: String,
                text: String,
                timestamps: Number,
            }
        ],
        required: true,
    }

},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Post', postSchema)
