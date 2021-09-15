const express = require('express');
const router = express.Router();

const controller = require('../controllers/user')

router.post('/time/send',  controller.send)
router.get('/reports/',  controller.getIdReports)
router.get('/reports/filter',  controller.getFilterOperationsReports)


module.exports = router;