const userModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    //affiche tout les users sans leurs MDP pour des questions de securites
    const users = await userModel.find().select('-password');
    res.status(200).json(users)
}

module.exports.userInfo = (req, res) => {
    console.log("REQ PARAMS >>>>>> ", req.params)
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Unknow : ' + req.params.id)

    userModel.findById(req.params.id, (err, data) => {
        if (!err) return res.send(data);
        else console.log('ID unknow : ' + err)
    }).select("-password");
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Unknow : ' + req.params.id)

    try {
        await userModel.findOneByUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err })
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

module.exports.deleteUser = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Unknow : ' + req.params.id)

    try {
        await userModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted." });

    } catch (err) {
        return res.status(500).json(err)
    }
}


module.exports.follow = async (req, res) => {
    // if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
    //     return res.status(400).send('ID unknow : ' + req.params.id)

    try {

        const updatedFollower = await userModel.findByIdAndUpdate(req.params.id, { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true });

        const updatedFollowing = await userModel.findByIdAndUpdate(req.body.idToFollow, { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true });

        res.status(200).json({updatedFollower, updatedFollowing})


        //add to the follower list
        // await userModel.findByIdAndUpdate(
        //     req.params.id,
        //     { $addToSet: { following: req.body.idToFollow } },
        //     { new: true, upsert: true },
        //     (err, docs) => {
        //         if (!err) res.status(201).json(docs)
        //         else return res.status(400).json(err);
        //     }
        // )

        //add to following list
        // await userModel.findByIdAndUpdate(
        //     req.body.idToFollow,
        //     { $addToSet: { followers: req.params.id } },
        //     { new: true, upsert: true },
        //     (err, docs) => {
        //         if (err) return res.status(400).json(err)
        //     }
        // )
    }

    catch (err) {
        console.log("never")
        return res.status(500).json({ message: err })
    }
}


module.exports.unfollow = async (req, res) => {
    // if (!isValidObjectId(req.params.id))
    //     return res.status(400).send('ID unknow : ' + req.params.id)

    try {

        const updatedFollower = await userModel.findByIdAndUpdate(req.params.id, { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true });

        const updatedFollowing = await userModel.findByIdAndUpdate(req.body.idToFollow, { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true });

        res.status(200).json(updatedFollower, updatedFollowing)


        //add to the follower list
        // await userModel.findByIdAndUpdate(
        //     req.params.id,
        //     { $addToSet: { following: req.body.idToFollow } },
        //     { new: true, upsert: true },
        //     (err, docs) => {
        //         if (!err) res.status(201).json(docs)
        //         else return res.status(400).json(err);
        //     }
        // )

        //add to following list
        // await userModel.findByIdAndUpdate(
        //     req.body.idToFollow,
        //     { $addToSet: { followers: req.params.id } },
        //     { new: true, upsert: true },
        //     (err, docs) => {
        //         if (err) return res.status(400).json(err)
        //     }
        // )
    }

    catch (err) {
        console.log("never")
        return res.status(500).json({ message: err })
    }
}