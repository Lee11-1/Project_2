const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post("/register", authController.register);
router.post("/signIn", authController.signIn); // (Tương tự cho signIn)
router.get("/logout", authController.logout);
router.get("/forgot", authController.forgot);
router.post("/forgot-password", authController.forgotPassword); // (Tương tự)
router.get("/myAcount", authController.myAcount );
router.get("/infoAcount", authController.getAcountInfo);

module.exports = router;