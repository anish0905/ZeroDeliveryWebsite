const express = require("express");
const router = express.Router();
const authController = require("../controller/usersController");

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);

router.post("/resend-otp", authController.resendOtp);

module.exports = router;
