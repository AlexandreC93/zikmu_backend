const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller.js')
//req.params.id.message
// router.get('userId', messageController.getAllMessages);
router.post('/', messageController.createMessage);
router.get('/:conversationId', messageController.readMessages)
module.exports = router;
