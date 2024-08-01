// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controller/usersController");

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);
router.post("/resend-otp", authController.resendOtp);
router.post("/login", authController.login);
router.put("/update-profile", authController.vendorUpdate);
router.delete('/delete/:id', authController.deleteUser); 



router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-otp-for-password-reset", authController.verifyOtpForPasswordReset);

router.get('/vendors-with-total-products', authController.getAllVendorsWithTotalProducts); // New route




module.exports = router;
