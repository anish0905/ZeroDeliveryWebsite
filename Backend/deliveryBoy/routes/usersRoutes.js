const express = require("express");
const router = express.Router();
const authController = require("../controller/usersController");

router.post("/register", authController.register);

router.post("/verify-otp", authController.verifyOtp);

router.post("/resend-otp", authController.resendOtp);

router.post("/login", authController.login);

router.post("/update-user", authController.updateUser);
router.delete("/delete-user/:id", authController.deleteUser);
router.get("/getAllDeliveryDetails", authController.getAllDeliveryDetails);
router.get("/:deliveryBoy",authController.getOrders)
router.post("/deliverOrder/sendOtp/:userId" , authController.sendOtp)
router.post("/deliverOrder/verifyOrder", authController.verifyAndDeliverOrder)
router.get("/getById/:id",authController.getUserById)
 // Endpoint for deleting user by ID

module.exports = router;
