const express = require("express");
const router = express.Router();

const postCatController = require('../controllers/postCat.controllers.js');

router.get('/', postCatController.getAllPostCat)
router.post('/', postCatController.createPostCat)

module.exports = router