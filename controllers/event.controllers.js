const userModel = require('../models/user.model.js')
const contactModel = require('../models/contact.model.js')
const eventModel = require('../models/event.model.js')
// npm i jsonwebtoken et require 
const jwt = require('jsonwebtoken')

module.exports.create = async (req, res) => {

    console.log(req.body)

    const { title, text, category, file, location } = req.body
    try {
        const event = await eventModel.create([{title, text, category, file, location }])
        res.status(202).json({ event })
        console.log(req.body, "req.body")
        console.log({ event })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}