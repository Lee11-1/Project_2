const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController.js');

router.post('/createExam', examController.createExam);
router.get('/exam/:exam_title/:exam_id', examController.getExamById);
router.post('/findMemtoExam', examController.findMember);
router.get('/infoExam', examController.getInfoExam);
// router.get('/getListQuestionSet', examController.getListQuestionSet);
router.post('/findQuestion', examController.findQuestions);


router.post('/createQuestionSet', examController.createQuestionSet);
router.get('/all-questionSet', examController.getAllSet);
router.get('/questionSet/:set_id', examController.getQuestionSetById);
router.get('/infoSet', examController.getInfoQuestionSet);
router.post('/addQuestion', examController.addQuestion);
router.post('/deleteSet', examController.deleteSet);



module.exports = router;