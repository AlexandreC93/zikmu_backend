const express = require('express');
const router = express.Router();

// 2 J'ai appelé le fichier authController pour pouvoir modifier les connection deconnection et s'identifier 
const authController = require('../controllers/auth.controllers')
const userController = require('../controllers/user.controllers')
// 2 Creation de route pour s'inscrire VOIR DOSSIER contollers/auth.controllers.js
router.get("/register", (req, res, next)=>{
  res.render('register')
});
router.post("/register", authController.signUp);

// Creation de route pour se connecter  VOIR DOSSIER contollers/auth.controllers.js
router.post("/login", authController.signIn);

// Creation de route pour se deconnecter  VOIR DOSSIER contollers/auth.controllers.js
router.get("/logout", authController.logout);

// 
router.get("/:id", userController.userInfo)

router.get('/', userController.getAllUsers)

router.put('/:id', userController.updateUser)

router.delete('/:id', userController.deleteUser)

router.patch("/follow/:id", userController.follow)
router.patch("/unfollow/:id", userController.unfollow)


module.exports = router;
