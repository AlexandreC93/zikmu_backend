const userModel = require('../models/user.model.js')
const contactModel = require('../models/contact.model.js')
const eventModel = require('../models/event.model.js')
const messageModel = require('../models/message.model.js')
// npm i jsonwebtoken et require 
const jwt = require('jsonwebtoken')

module.exports.createMessage = async (req, res, next) => {
    const newMessage = new messageModel(req.body)

    try{
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (err) {
        res.status(500).json(err)
    }
}
module.exports.readMessages = async (req, res, next) => {
    try{
        const messages = await messageModel.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json(err)
    }
}
