const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post("/sendRequest", requestController.sendRequest);
router.post("/unRequest", requestController.unRequest);

module.exports = router;