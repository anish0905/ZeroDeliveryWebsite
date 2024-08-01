const express = require("express");
const router = express.Router();
const authController = require("../controller/usersController");

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);

router.post("/resend-otp", authController.resendOtp);

router.get("/getAllDeliveryDetails", authController.getAllDeliveryDetails);

module.exports = router;
