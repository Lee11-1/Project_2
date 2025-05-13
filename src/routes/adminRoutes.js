const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get("/getAllDataForAdmin",adminController.getAllData);

module.exports = router;