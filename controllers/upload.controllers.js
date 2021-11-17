const userModel = require('../models/user.model.js');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline)

module.exports.uploadProfil = (req, res) => {
    try {
        if (
            req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "image/png" &&
            req.file.detectedMimeType !== "image/jpeg"
        )
            throw Error('invalid file');

        if (req.file.size > 500000) throw Error('Max Size')
    } catch (err) {
        return res.status(201).json(err);
    }

    const fileName = req.body.name + ".jpg";

    pipeline(
        req.file.stream,
        fs.createWriteStream(
            `../zikmu_frontend/public/uploads/profil/${fileName}`
        )
    )

    try {
        userModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { image: "./uploads/profil/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
module.exports.uploadProfil = (req, res) => {
    try {
        if (
            req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "image/png" &&
            req.file.detectedMimeType !== "image/jpeg"
        )
            throw Error('invalid file');

        if (req.file.size > 500000) throw Error('Max Size')
    } catch (err) {
        return res.status(201).json(err);
    }

    const fileName = req.body.name + ".jpg";

    pipeline(
        req.file.stream,
        fs.createWriteStream(
            `../zikmu_frontend/public/image/zikmu/${fileName}`
        )
    )

    try {
        userModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { image: "./uploads/profil/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};