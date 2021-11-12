const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers.js')
const eventController = require('../controllers/event.controllers')
/* GET home page. */
router.get('/', eventController.getAllEvents)

router.get('/form', (req, res, next) => {
    res.render('eventForm')
})

router.post('/submit', eventController.create)


module.exports = router;
