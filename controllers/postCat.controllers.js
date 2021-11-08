const userModel = require('../models/user.model.js')
const contactModel = require('../models/contact.model.js')
const eventModel = require('../models/event.model.js')
const messageModel = require('../models/message.model.js')
const postCatModel = require('../models/postCat.model.js')
// npm i jsonwebtoken et require 
const jwt = require('jsonwebtoken')

module.exports.createPostCat = async (req, res, next) => {

    const { name, posts } = req.body
    try {
        const postCat = await postCatModel.create([{ name, posts }])
        res.status(202).json({ postCat });
        console.log(req.body, "req.body");
        console.log({ postCat });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}

module.exports.getAllPostCat = async (req, res, next) => {
    const postCat = await postCatModel.find().select();
    res.status(200).json({postCat});
}

module.exports.updatePostCat = async (req, res, next) => {
    const updatePostCat = await postCatModel.find({
        id: ""
    })
}
