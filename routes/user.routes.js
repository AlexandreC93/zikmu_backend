const express = require("express");
const router = express.Router();

// 2 J'ai appelé le fichier authController pour pouvoir modifier les connection deconnection et s'identifier
const authController = require("../controllers/auth.controllers");
const userController = require('../controllers/user.controllers.js')
const uploadController = require('../controllers/upload.controllers.js')
const multer = require('multer');
const upload = multer()

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);


module.exports = router;
