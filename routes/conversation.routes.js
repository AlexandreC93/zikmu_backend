const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation.controllers.js')

//new conv

router.post('/', conversationController.createConversation)


//get conv 
router.get('/:userId', conversationController.getConversation)

module.exports = router;
