const postModel = require('../models/post.model.js');
const userModel = require('../models/user.model.js');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.createPost = async (req, res, next) => {
    console.log("submit", req.body)
    const newPost = new postModel({
        posterId: req.body.posterId,
        category: req.body.category,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],

    });

    try {
        const post = await newPost.save();
        return res.status(202).json(post)
        console.log({ post })
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

module.exports.readPost = async (req, res, next) => {

    try {
        const postWithUser = await postModel.find().populate({
            path: 'posterId',
            select: "surname image"
        })
        console.log(postWithUser)
        res.status(200).json(postWithUser)
        // .sort({ createdAt: -1 })

    } catch (err) {
        console.error(err)
        return err
    }


    // userModel.findOne({_id: userId})
    // .populate('posts')
    // .then(user => {
    //     res.json(user)
    // })
}

module.exports.updatePost = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Unknow : ' + req.params.id)
    console.log(req.body)

    const updatedRecord = {
        message: req.body.message
    }

    postModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error" + err)
        }
    )
}
module.exports.deletePost = async (req, res, next) => {

    console.log(req.body);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Unknow : ' + req.params.id);

    postModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Delete error : " + err)
        }
    )
}

module.exports.likePost = async (req, res, next) => {
    console.log(req.body);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Unknow : ' + req.params.id);

    try {
        const updatedPost = await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true }
        );
        const updatedUser = await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true }
        )
        res.status(200).json({ updatedPost, updatedUser });
    } catch (err) {
        return res.status(400).send(err)
    }

}

module.exports.unlikePost = async (req, res, next) => {
    console.log(req.body);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Unknow : ' + req.params.id);

    try {
        const updatedPost = await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true }
        );
        const updatedUser = await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true }
        )
        res.status(200).json({ updatedPost, updatedUser });
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.commentPost = (req, res, next) => {
    console.log(req.body)
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Unknow : ' + req.params.id);

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    }
                }
            },

            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}


module.exports.editCommentPost = (req, res, next) => {
    console.log(req.body)
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Unknow : ' + req.params.id);

    try {
        return postModel.findById(
            req.params.id,
            (err, docs) => {
                const theComment = docs.comments.find((comment) =>
                    comment._id.equals(req.body.commentId)
                )

                if (!theComment) return res.status(404).send('Comment not found')
                theComment.text = req.body.text;

                return docs.save((err) => {
                    if (!err) return res.status(200).send(docs);
                    return res.status(500).send(err)
                })
            }
        );

    } catch (err) {
        return res.status(400).send(err)
    }

}


module.exports.deleteCommentPost = (req, res, next) => {
    console.log(req.body)
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Unknow : ' + req.params.id);

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err);
    }
}