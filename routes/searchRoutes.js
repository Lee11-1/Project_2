// routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/search/:subject', searchController.findClassBySubject);
router.get('/resultFind', searchController.resultFind);

module.exports = router;