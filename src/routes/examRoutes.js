const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController.js');

router.post('/createExam', examController.createExam);

module.exports = router;