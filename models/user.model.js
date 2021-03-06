const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

//definition du model
const userSchema = new Schema({

    fullName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 55
    },
    birthDate: {
        type: Date,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail],
        trim: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        minLenght: 6,
        trim: true
    },
    image: {
        type: String,
        default: "./uploads/profil/random-user"
    },
    bio: {
        type: String,
        max: 1024
    },
    followers: {
        type: [String],
    },
    following: {
        type: [String]
    },
    likes: {
        type: [String]
    },

    gender: {
        type: String,
        enum: ["Homme", "Femme", "Non-Binary"],
        default: "Homme"
    },
    recommandations: {
        type: [String]
    },
    messages: {
        type: [String],
    },

},
    {
        timestamps: true,
        strict: false
    });

//Function avant de sauvegarder pour hasher le MDP

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email')
};

module.exports = mongoose.model('User', userSchema)
