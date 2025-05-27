
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.post('/create-folder', classController.createFolder);
router.post('/addClass', classController.addClass);
router.get('/all-classes', classController.getAllClasses);
router.get('/class/:class_id', classController.getClassById);
router.get('/infoClass', classController.getInfoClass);
router.post('/deleteClass', classController.deleteClass);
router.post('/deleMem', classController.deleteMember);
router.post('/deleReMem', classController.deleteRequestMember);
router.post('/addMem', classController.addMember);
router.post('/findMem', classController.findMember);
router.post('/createNewTest', classController.createNewTest);
router.post('/deleteTest/:testId', classController.deleteTest);


module.exports = router;