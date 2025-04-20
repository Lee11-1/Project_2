const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController.js');

router.post('/createExam', examController.createExam);
router.get('/exam/:exam_title/:exam_id', examController.getExamById);
// router.get('/checkOwnerExam/:exam_id', examController.checkOwnerExam);

module.exports = router;