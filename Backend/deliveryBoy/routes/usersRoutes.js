const express = require("express");
const router = express.Router();
const authController = require("../controller/usersController");

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);

router.post("/resend-otp", authController.resendOtp);

router.post("/login", authController.login);

router.post("/update-user", authController.updateUser);
router.post("/delete-user:id", authController.deleteUser); // Endpoint for deleting user by ID
0;
module.exports = router;
