const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth')

router.post('/registration',  controller.registration)
router.post('/login', controller.login )
router.post('/decodetoken', controller.decodetoken )

module.exports = router;