const userModel = require('../models/user.model.js')
const contactModel = require('../models/contact.model.js')
// npm i jsonwebtoken et require 
const jwt = require('jsonwebtoken')

// Le jwt est valable QUE 3 jours apres on va lui demander de se reconneter
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

// 1


// 2 s'inscrire // Quand tu es sur la page S'INSCRIRE tu m'affiche firstname lastname...
module.exports.signUp = async (req, res) => {

    console.log(req.body)

    const { fullName, surname, email, image, password, gender } = req.body
    try {
        const user = await userModel.create([{ fullName, surname, image, email, password, gender }])
        res.status(202).json({ user: user._id })
        console.log(req.body, "req.body")
        console.log({ user })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}

// 3 se connecter // 
module.exports.signIn = async (req, res) => {
    // affichage des email et password 
    console.log(req.body)
    console.log(req.cookie)
    const { email, password } = req.body;
    try {
        const user = await userModel.login(email, password);
        const token = createToken(user._id);
        // res.cookie tu me garde dans cookiie les email et identifant il va rester activer que sur le serveur
        // si c'est ok res.status 200 on a reussi
        res.cookie('jwt', token);
        // res.setHeader('Set-Cookie', `jwt=${token}; Max-Age=${maxAge}; HttpOnly; secure`);
        res.status(200).json({ user: user._id });
    } catch (err) {
        console.log("token", err)
        res.status(500).json({ err });
    }
}
// 4 Se deconnecters
module.exports.logout = async (req, res) => {
    // res.send('redirection')
    // maxAge a 1 milliseconde va disparaitre quand il va se deconnecter 
    res.cookie('jwt', '', { maxAge: 1 });
    // et il sera rediriger la page home grace a redirect
    res.redirect('/');
}



module.exports.getUserPage = (req, res) => {
    user.findOne({
        _id: req.params.id
    })
        .then()
        .catch()

}


module.exports.contact = async (req, res) => {

    console.log(req.body)

    const { fullName, email, object, text, file } = req.body
    try {
        const contact = await contactModel.create([{ fullName, object, email, text, file }])
        res.status(202).json({ contact })
        console.log(req.body, "req.body")
        console.log({ contact })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}
