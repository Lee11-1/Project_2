const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController.js');

router.post('/createExam', examController.createExam);
router.get('/exam/:exam_title/:exam_id', examController.getExamById);
router.post('/findMemtoExam', examController.findMember);
router.get('/infoExam', examController.getInfoExam);
// router.get('/getListQuestionSet', examController.getListQuestionSet);
router.post('/findQuestion', examController.findQuestions);
router.get('/checkStartExam', examController.checkStartExam);
router.get('/exam/:exam_title', examController.startExam);
router.get('/getDataForExam', examController.getDataForExam);
router.get('/getAttempt', examController.getAttempt);
router.post('/submitExam', examController.submitExam);
// router.get("/getCorrectAnswer", examController.Answer);


router.post('/createQuestionSet', examController.createQuestionSet);
router.get('/all-questionSet', examController.getAllSet);
router.get('/questionSet/:set_id', examController.getQuestionSetById);
router.get('/infoSet', examController.getInfoQuestionSet);
router.post('/addQuestion', examController.addQuestionToSet);
router.post('/deleteSet', examController.deleteSet);
router.post('/addQuestionToExam', examController.addQuestionToExam);
router.post('/deleteQuestionToExam', examController.deleteQuestionToExam);


module.exports = router;