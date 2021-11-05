const postModel = require('../models/post.model.js')


module.exports.submit = async (req, res, next) => {
    console.log("submit", req.body)
    const { text, file, location } = req.body
    
    try {
        const post = await postModel.create([{ text, file, location }])
        res.status(202).json({ post })
        console.log({ post })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}