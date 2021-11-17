const userModel = require('../models/user.model.js')
const contactModel = require('../models/contact.model.js')
const eventModel = require('../models/event.model.js')
// npm i jsonwebtoken et require 
const jwt = require('jsonwebtoken')



//creation d'un event
module.exports.create = async (req, res) => {
    // const coordinates = req.body.coordinate
    const coordinatesObject = JSON.parse(req.body.coordinates)
    console.log(req.body)
    console.log(req.file)
    console.log(coordinatesObject);
    const { title, text, category } = req.body
    // res.status(200).json(req.body);
    console.log("COORDINATE OBJECT >>>>>>>>>", coordinatesObject)
    // const type = req.body.type.split(" ").join().toLowerCase();

    // if (!req.file) {
    //     return res.status(400).json({
    //         message: "You need to provide at least one image",
    //     });
    // }

    try {
        // const pictures = req.file?.map(
        //     (file) => `/pictures/event/${file.filename}`
        // );
        const event = await eventModel.create([{
            title, text, category, coordinatesObject
        }])

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