const userModel = require('../models/user.model.js')
const contactModel = require('../models/contact.model.js')
const eventModel = require('../models/event.model.js')
const categoryModel = require('../models/category.model.js')
// npm i jsonwebtoken et require 
const jwt = require('jsonwebtoken')


//creation d'une category
module.exports.create = async (req, res) => {

    console.log(req.body)

    const { name, songs } = req.body
    try {
        const category = await categoryModel.create([{ name, songs }])
        res.status(202).json({ category })
        console.log(req.body, "req.body")
        console.log({ category })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}

//Pour recup toutes les category
module.exports.getAllCategory = async (req, res) => {
    console.log(req.body)

    const category = await categoryModel.find().select();
    res.status(200).json({category})
}