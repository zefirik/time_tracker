const express = require('express');
const router = express.Router();

const controller = require('../controllers/user')

router.post('/time/send',  controller.send)


module.exports = router;