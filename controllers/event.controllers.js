const userModel = require('../models/user.model.js')
const contactModel = require('../models/contact.model.js')
const eventModel = require('../models/event.model.js')
// npm i jsonwebtoken et require 
const jwt = require('jsonwebtoken')


//creation d'un event
module.exports.create = async (req, res) => {

    console.log(req.body)

    const { title, text, category, file, location } = req.body

    const coordinatesObject = JSON.parse(req.body.coordinates);
    const type = req.body.type.split(" ").join().toLowerCase();
    delete req.body.coordinates;
    delete req.body.type;


    if (!req.files) {
        return res.status(400).json({
            message: "You need to provide at least one image",
        });
    }
    const picturesUrl = req.files.map(
        (file) => `/pictures/event/${file.filename}`
    );
    try {
        const event = await eventModel.create([{ title, text, category, file, location }])
        res.status(202).json({ event })
        console.log(req.body, "req.body")
        console.log({ event })
    }

    catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}
//Pour avoir tout les events
module.exports.getAllEvents = async (req, res) => {
    console.log("event")
    const events = await eventModel.find().select()
    res.status(200).json({ events })
}