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
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: isEmail,
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
    recommandations: {
        type: [String]
    }
},
    {
        timestamps: true,
    });

//Function avant de sauvegarder pour hasher le MDP

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


module.exports = mongoose.model('User', userSchema)
