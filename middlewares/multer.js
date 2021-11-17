const multer = require("multer")
const path = require("path")

const uniqueFilename = (req, file, cb) => {
    const nameObject = path.parse(file.originalname)
    cb(null, nameObject.name.split(" ").join("_") + Date.now() + nameObject.ext)
}

// const avatarStorage = multer.diskStorage({
//     destination: "images/avatars",
//     filename: uniqueFilename
// })

const locationStorage = multer.diskStorage({
    destination: "/public/image/zikmu",
    filename: uniqueFilename
})

module.exports = {
    // multerSingle: multer({
    //     storage: avatarStorage
    // }).single("image"),
    multerSingle: multer({
        storage: locationStorage
    }).single("file")
}